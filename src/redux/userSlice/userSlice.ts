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
  edit: boolean;
  _id: string;
  productId: string;
  user: {
    _id: any;
    firstName: string;
    lastName: string;
  };
  rating: number;
  createdAt: string;
  updatedAt: number;
  comment: string;
}

interface GetUser {
  _id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  firstName: string;
  password: string;
  lastName: string;
  phone: string;
  address: string[];
}

interface UserData {
  user: {};
  wishlist: Product[];
  review: Review[];
  getUser: GetUser;
  status: string;
  error: string | null;
}

const initialState: UserData = {
  user: {},
  wishlist: [],
  review: [],
  getUser: {
    _id: "",
    email: "",
    createdAt: "",
    updatedAt: "",
    __v: 0,
    firstName: "",
    lastName: "",
    password: "",
    phone: "",
    address: [],
  },
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
>("user/deleteWishlist", async function (id, { rejectWithValue }) {
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

export const deleteReview = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("user/deleteReview", async function (id, { rejectWithValue }) {
  try {
    const { data } = await axios.delete(
      `${apiUrl}/user/review/deletereview/${id}`,
      {
        headers: {
          Authorization: authToken,
        },
      }
    );
    toast.success(data.msg, { autoClose: 500, theme: "colored" });
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const editReview = createAsyncThunk<
  Review[],
  { _id: string; comment: string; rating: number },
  { rejectValue: string }
>(
  "user/editReview",
  async function ({ _id, comment, rating }, { rejectWithValue }) {
    try {
      const response = await axios.put(
        `${apiUrl}/user/review/editreview`,
        {
          _id: _id,
          comment: comment,
          rating: rating,
        },
        {
          headers: {
            Authorization: authToken,
          },
        }
      );
      toast.success(response.data.msg, { autoClose: 500, theme: "colored" });
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.msg, {
        theme: "colored",
        autoClose: 600,
      });

      return rejectWithValue(error.message);
    }
  }
);

export const getUserData = createAsyncThunk<
  GetUser[],
  void,
  { rejectValue: string }
>("user/getUser", async function (_, { rejectWithValue }) {
  try {
    if (authToken) {
      const { data } = await axios.get(`${apiUrl}/user/auth/getuser`, {
        headers: {
          Authorization: authToken,
        },
      });
      return data;
    }
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSelectedUser: (state, action: PayloadAction<{}>) => {
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
    removeStateReview: (state, action: PayloadAction<string>) => {
      state.review = state.review.filter((r) => r._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
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
    builder.addCase(deleteReview.fulfilled, (state, action: any) => {
      state.status = "resolved";
    });

    builder.addCase(getUserData.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getUserData.fulfilled, (state, action: any) => {
      state.status = "resolved";
      state.getUser = action.payload;
    });
  },
});

export const {
  setSelectedUser,
  setSelectedWishlist,
  removeStateWishlist,
  setSelectedReview,
  removeStateReview,
} = userSlice.actions;

export default userSlice.reducer;
