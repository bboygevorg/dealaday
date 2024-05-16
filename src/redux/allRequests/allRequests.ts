import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../helper/env";
import { GetBanner, Product, ProductSearch, allRequestsState } from "./types";

const initialState: allRequestsState = {
  topSlider: [],
  mostSlider: [],
  dealsProducts: [],
  bannerProduct: [],
  products: [],
  getBanner: [],
  error: null,
  loading: "pending",
};

export const fetchAllProducts = createAsyncThunk<
  ProductSearch[],
  void,
  { rejectValue: string }
>("all/products", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${apiUrl}/product/products`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue("Failed to get product");
  }
});

export const fetchgetBanner = createAsyncThunk<
  GetBanner[],
  void,
  { rejectValue: string }
>("all/getBanner", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${apiUrl}/product/banner`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue("Failed to get product");
  }
});
const createAsyncThunkForProduct = (endpoint: string, actionType: string) =>
  createAsyncThunk<Product[], void, { rejectValue: string }>(
    actionType,
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await axios.get(`${apiUrl}/product/${endpoint}`);
        return data;
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );

export const fetchToptSLider = createAsyncThunkForProduct(
  "topproducts",
  "all/topProduct"
);
export const fetchMostSLider = createAsyncThunkForProduct(
  "mostpopular",
  "all/mostProduct"
);
export const fetchDealsProduct = createAsyncThunkForProduct(
  "dealsproducts",
  "all/dealsProduct"
);
export const fetchBannerProduct = createAsyncThunkForProduct(
  "bannerproduct",
  "all/bannerProduct"
);

const allRequestsSlice = createSlice({
  name: "all",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchToptSLider.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchToptSLider.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.mostSlider = action.payload;
      })
      .addCase(fetchToptSLider.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.payload ?? "Error fetching mostSlider";
      })
      .addCase(fetchMostSLider.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchMostSLider.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.topSlider = action.payload;
      })
      .addCase(fetchMostSLider.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.payload ?? "Error fetching topSlider";
      })

      .addCase(fetchDealsProduct.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchDealsProduct.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.dealsProducts = action.payload;
      })

      .addCase(fetchDealsProduct.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.payload ?? "Error fetching dealsProduct";
      })

      .addCase(fetchBannerProduct.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchBannerProduct.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.bannerProduct = action.payload;
      })
      .addCase(fetchBannerProduct.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.payload ?? "Error fetching banner";
      })

      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.products = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.payload ?? "Error fetching allProduts";
      })

      .addCase(fetchgetBanner.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchgetBanner.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.getBanner = action.payload;
      })
      .addCase(fetchgetBanner.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.payload ?? "Error fetching getBannerInfo";
      });
  },
});

export default allRequestsSlice.reducer;
