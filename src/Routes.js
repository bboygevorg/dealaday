import React from "react";
import { Routes, Route } from "react-router";
import Layout from "./layout/Layout";
import HomePage from "./pages/HomePage";
import Products from "./pages/Products";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/products" element={<Products />} />
      </Route>
    </Routes>
  );
}

export default Router;
