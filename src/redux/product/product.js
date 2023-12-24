import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  selectedProduct: null,
  productColor: [],
  iconOption: [],
  loading: false,
  error: null,
};

const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (params, { rejectWithValue, dispatch }) => {
    const { url, successAction } = params;

    try {
      const response = await axios.get(url);
      const serializableData = {
        data: response.data,
        status: response.status,
        // other serializable fields as needed
      };
      dispatch(successAction(serializableData));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productInfoSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setProductColor: (state, action) => {
      state.productColor = [...action.payload];
    },
    setIconOption: (state, action) => {
      state.iconOption = [...action.payload];
    },
    clearProductInfo: (state) => {
      state.selectedProduct = null;
      state.productColor = [];
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: {
    [fetchProducts.fulfilled]: (state) => {
      state.loading = false;
    },
    [fetchProducts.pending]: (state) => {
      state.loading = true;
    },
    [fetchProducts.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const { setSelectedProduct, setProductColor, setIconOption } =
  productInfoSlice.actions;

export const getGoodsId = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`http://localhost:3500/products/${id}`);
      dispatch(setSelectedProduct(res.data));

      const productName = res.data.name;
      const productIcon = res.data;

      const productsWithSameNameRes = await axios.get(
        `http://localhost:3500/products?name=${productName}`
      );
      const productsWithSameName = productsWithSameNameRes.data;
      const iconOption = productIcon.icon_option || [];
      dispatch(setProductColor(productsWithSameName));
      dispatch(setIconOption(iconOption));
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };
};

export default productInfoSlice.reducer;
