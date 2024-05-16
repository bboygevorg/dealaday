import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../products/products";
import productInfoReducer from "../productInfo/productInfo";
import cartSlcieReducer from "../cartSlice/cartSlice";
import userSliceReducer from "../userSlice/userSlice";
import allRequestsReducer from "../allRequests/allRequests";

const store = configureStore({
  reducer: {
    products: productsReducer,
    productInfo: productInfoReducer,
    cartSlice: cartSlcieReducer,
    userSlice: userSliceReducer,
    allRequests: allRequestsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
