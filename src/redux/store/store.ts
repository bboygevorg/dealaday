import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../products/products";
import productInfoReducer from "../productInfo/productInfo";

const store = configureStore({
  reducer: {
    products: productsReducer,
    productInfo: productInfoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
