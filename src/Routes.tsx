import React from "react";
import { Routes, Route } from "react-router";
import { Layout, Layout_Basket } from "./layout/Layout";
import HomePage from "./pages/HomePage/HomePage";
import Products from "./pages/Products/Products";
import ProductPage from "./pages/ProductPage/ProductPage";
import Basket from "./pages/CartPage/Basket";
import Login from "./Auth/Login/Login";
import Register from "./Auth/Register/Register";
import ForgotPassword from "./Auth/ForgotPassword/ForgotPassword";
import AddNewPassword from "./Auth/ForgotPassword/AddNewPassword";
import UserPage from "./pages/UserPage/UserPage";
import Checkout from "./pages/Checkout/Checkout";
import PageNotFound from "./pages/404/PageNotFound";

function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/lk" element={<UserPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
        <Route element={<Layout_Basket />}>
          <Route path="/basket" element={<Basket />} />
          <Route path="/Checkout" element={<Checkout />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/password-reset/:id/:token" element={<AddNewPassword />} />
      </Routes>
    </>
  );
}

export default Router;
