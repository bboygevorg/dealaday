import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
const authToken = localStorage.getItem("Authorization");

interface Product {
  productId: {
    _id: string;
  };
}

interface WishlistState {
  user: Record<string, any>;
  wishlist: Product[];
  status: string;
  error: string | null;
}

const initialState: WishlistState = {
  user: {},
  wishlist: [],
  status: "ide",
  error: null,
};

export const fetchWishlist = createAsyncThunk<
  Product[],
  undefined,
  { rejectValue: string }
>("user/wishlist", async function (_, { rejectWithValue }) {
  try {
    const { data } = await axios.get(
      "http://192.168.1.68:5000/user/wishlist/fetchwishlist",
      {
        headers: {
          Authorization: authToken,
        },
      }
    );

    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// export const deleteTodo = createAsyncThunk(
//   "wishlist/delete",
//   async function (id, { rejectWithValue, dispatch }) {
//     try {
//       const deleteProduct = await axios.delete(
//         `http://192.168.1.68:5000/user/wishlist/deletewishlist${id}`,
//         {
//           headers: {
//             Authorization: authToken,
//           },
//         }
//       );
//       dispatch(removeStateWishlist(id));
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

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
  },
});

export const { setSelectedUser, setSelectedWishlist } = userSlice.actions;

export default userSlice.reducer;
