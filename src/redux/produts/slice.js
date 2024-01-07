import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchProducts = createAsyncThunk(
  "pizza/fetchProducts",
  async (params) => {
    const response = await axios.get(`http://localhost:3500/products`);

    return response.data;
  }
);

const initialState = {
  products: [],
  status: false,
};

const productSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setProducts(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = "LOADING";
      state.items = [];
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = "SUCCESS";
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.status = "ERROR";
      state.items = [];
    });
  },
});

export const { setItems } = productSlice.actions;
export default productSlice.reducer;
