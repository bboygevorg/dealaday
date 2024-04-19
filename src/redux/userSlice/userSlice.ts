import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { functions } from "lodash";
import { toast } from "react-toastify";
import { apiUrl } from "../../helper/env";

const authToken = localStorage.getItem("Authorization");
let setProceed = authToken ? true : false;

interface Product {
  productId: {
    _id: string;
    img: string;
    title: string;
    rating: number;
    price: number;
    price_previous: number;
  };
}

interface Review {
  productId: string;
  user: {
    firstName: string;
    lastName: string;
  };
  rating: number;
  createdAt: string;
  updatedAt: number;
  comment: string;
}

interface WishlistState {
  user: Record<string, any>;
  wishlist: Product[];
  review: Review[];
  status: string;
  error: string | null;
}

const initialState: WishlistState = {
  user: {},
  wishlist: [],
  review: [],
  status: "ide",
  error: null,
};

export const fetchWishlist = createAsyncThunk<
  Product[],
  undefined,
  { rejectValue: string }
>("user/wishlist", async function (_, { rejectWithValue, dispatch }) {
  try {
    if (setProceed) {
      const { data } = await axios.get(
        `${apiUrl}/user/wishlist/fetchwishlist`,
        {
          headers: {
            Authorization: authToken,
          },
        }
      );
      return data;
    }
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const postWishlist = createAsyncThunk<
  Product[],
  string,
  { rejectValue: string }
>("user/postWishlist", async function (id, { rejectWithValue, dispatch }) {
  try {
    const { data } = await axios.post(
      `${apiUrl}/user/wishlist/addWishlist`,
      {
        _id: id,
      },
      {
        headers: {
          Authorization: authToken,
        },
      }
    );
    dispatch(fetchWishlist());
    toast.success("Added To WishList", { autoClose: 500, theme: "colored" });
    return data;
  } catch (error: any) {
    toast.error(error.response.data.msg, { autoClose: 500, theme: "colored" });
    return rejectWithValue(error.response.data.msg);
  }
});

export const deleteWishlist = createAsyncThunk<
  Product[],
  string,
  { rejectValue: string }
>("user/deleteWishlist", async function (id, { rejectWithValue, dispatch }) {
  try {
    const { data } = await axios.delete(
      `${apiUrl}/user/wishlist/deletewishlist/${id}`,
      {
        headers: {
          Authorization: authToken,
        },
      }
    );
    toast.success("Remove from Wishlist", { autoClose: 500, theme: "light" });
    return data;
  } catch (error: any) {
    toast.error(error.response.data.msg, { autoClose: 500, theme: "colored" });
    return rejectWithValue(error.response.data.msg);
  }
});

export const fetchReview = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("user/review", async function (id, { rejectWithValue }) {
  try {
    const { data } = await axios.get(`${apiUrl}/user/review/getreview/${id}`);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSelectedUser: (state, action: PayloadAction<() => void>) => {
      state.user = action.payload;
    },
    setSelectedWishlist: (state, action: PayloadAction<[]>) => {
      state.wishlist = action.payload;
    },
    removeStateWishlist: (state, action: PayloadAction<string>) => {
      state.wishlist = state.wishlist.filter(
        (c) => c.productId._id !== action.payload
      );
    },
    setSelectedReview: (state, action: PayloadAction<[]>) => {
      state.review = action.payload;
    },
  },
  extraReducers: (builder) => {
    // wishlist
    builder.addCase(fetchWishlist.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchWishlist.fulfilled, (state, action) => {
      state.status = "resolved";
      state.wishlist = action.payload;
    });
    builder.addCase(fetchWishlist.rejected, (state, action: any) => {
      state.status = "rejected";
      state.error = action.payload;
    });

    builder.addCase(postWishlist.rejected, (state, action: any) => {
      state.status = "rejected";
      state.error = action.payload;
    });

    builder.addCase(deleteWishlist.rejected, (state, action: any) => {
      state.status = "rejected";
      state.error = action.payload;
    });

    builder.addCase(fetchReview.fulfilled, (state, action: any) => {
      state.status = "resolved";
      state.review = action.payload;
    });
  },
});

export const {
  setSelectedUser,
  setSelectedWishlist,
  removeStateWishlist,
  setSelectedReview,
} = userSlice.actions;

export default userSlice.reducer;
