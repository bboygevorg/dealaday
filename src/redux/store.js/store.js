import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../initialGoods/initialGoods";
import productInfoReducer from "../product/product";

const store = configureStore({
  reducer: {
    products: productReducer,
    productInfo: productInfoReducer,
  },
});

export default store;
