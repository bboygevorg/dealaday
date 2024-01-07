import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../produts/slice";
import productInfoReducer from "../product/product";

const store = configureStore({
  reducer: {
    products: productReducer,
    productInfo: productInfoReducer,
  },
});

export default store;
