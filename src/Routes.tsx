import React from "react";
import { Routes, Route, useLocation } from "react-router";
import Layout from "./layout/Layout";
import HomePage from "./pages/HomePage/HomePage";
import Products from "./pages/Products/Products";
import ProductPage from "./pages/ProductPage/ProductPage";
import Basket from "./pages/CartPage/Basket";

function Router() {
  const location = useLocation();

  const isBasketPage = location.pathname === "/basket";
  return (
    <>
      <Routes>
        <Route path="/" element={isBasketPage ? <Basket /> : <Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/basket" element={<Basket />} />
        </Route>
      </Routes>
    </>
  );
}

export default Router;
