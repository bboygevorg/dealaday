import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../initialGoods/initialGoods";

const store = configureStore({
  reducer: {
    products: productReducer,
  },
});

export default store;
