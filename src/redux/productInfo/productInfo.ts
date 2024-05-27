import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../helper/env";
import { Product, ProductState } from "./types";

const initialState: ProductState = {
  selectedProduct: {},
  loading: "idle",
  error: null,
  productColor: [],
};

export const getProductInfo = createAsyncThunk<
  Product,
  string,
  { rejectValue: string }
>(
  "products/getProductInfo",
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      let url = `${apiUrl}/product/products/${id}`;

      const response = await axios.get(url);
      const productName = response.data.name;

      const productsWithSameNameRes = await axios.get(
        `${apiUrl}/product/products?name=${productName}`
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
    setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
      state.selectedProduct = action.payload;
    },
    setProductColor: (state, action: PayloadAction<[]>) => {
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
        state.selectedProduct = action.payload;
        state.loading = "succeeded";
      })
      .addCase(getProductInfo.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});

export const { setSelectedProduct, setProductColor } = productInfoSlice.actions;

export default productInfoSlice.reducer;
