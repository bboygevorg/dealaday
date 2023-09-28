import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  isDealOne: [],
  filteredProductsTop: [],
  bannerProduct: {},
  loading: false,
};

export const getGoods = createAsyncThunk(
  "products/getGoods",
  async (_, { rejectWithValue, dispatch }) => {
    const res = await axios.get("http://localhost:3500/products");
    dispatch(setGoods(res.data));
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setGoods: (state, action) => {
      state.products = action.payload;

      // Set isDealOne
      state.isDealOne = action.payload
        .filter((product) => product.isDealOfTheDay === true)
        .slice(0, 3);

      // Set filteredProducts
      const below5Products = state.products.filter(
        (product) => product.rating < 5
      );

      const rating5Products = state.products.filter(
        (product) => product.rating === 5
      );

      let productsToShow = [];

      if (rating5Products.length >= 7) {
        productsToShow = rating5Products.slice(0, 7);
      } else if (below5Products.length >= 7) {
        productsToShow = below5Products.slice(0, 7);
      }

      state.filteredProductsTop = productsToShow;

      //banner product
      state.bannerProduct = state.products
        .filter((product) => product.bannerProduct === true)
        .slice(0, 1);
    },
  },
  extraReducers: {
    [getGoods.fulfilled]: (state) => {
      state.loading = false;
    } /* вызывается когда запрос прошел успешно */,
    [getGoods.pending]: (state) => {
      state.loading = true;
    } /* вызывается когда начинаем запрос (вызываем функцию getGoods) */,
    [getGoods.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const { setGoods } = productSlice.actions;
export default productSlice.reducer;
