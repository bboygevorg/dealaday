import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../products/products";
import productInfoReducer from "../productInfo/productInfo";
import cartSlcieReducer from "../cartSlice/cartSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    productInfo: productInfoReducer,
    cartSlice: cartSlcieReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
