import React from "react";
import { Routes, Route } from "react-router";
import Layout from "./layout/Layout";
import HomePage from "./pages/HomePage/HomePage";
import Products from "./pages/Products/Products";
import ProductPage from "./pages/ProductPage/ProductPage";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductPage />} />
      </Route>
    </Routes>
  );
}

export default Router;
