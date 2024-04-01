import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface ProductState {
  selectedProduct: any | null;
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
  productColor: [];
}

const initialState: ProductState = {
  selectedProduct: null,
  loading: "idle",
  error: null,
  productColor: [],
};

export const getProductInfo = createAsyncThunk(
  "products/getProductInfo",
  async (id: any, { rejectWithValue, dispatch }) => {
    try {
      let url = `http://localhost:5000/product/products/${id}`;
      const response = await axios.get(url);
      const productName = response.data.name;

      const productsWithSameNameRes = await axios.get(
        `http://localhost:5000/product/products?name=${productName}`
      );
      const productsWithSameName = productsWithSameNameRes.data;
      dispatch(setProductColor(productsWithSameName));
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to get product");
    }
  }
);

const productInfoSlice = createSlice({
  name: "productInfo",
  initialState,
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setProductColor: (state, action) => {
      state.productColor = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductInfo.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getProductInfo.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.selectedProduct = action.payload;
      })
      .addCase(getProductInfo.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});

export const { setSelectedProduct, setProductColor } = productInfoSlice.actions;

export default productInfoSlice.reducer;
