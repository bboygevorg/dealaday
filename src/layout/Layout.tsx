import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header/Header";
import Footer from "./Footer/Footer/Footer";
import Header_basket from "./Header/Header_basket/Header_basket";
import Footer_basket from "./Footer/Footer_basket/Footer_basket";

export const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export const Layout_Basket = () => {
  return (
    <>
      <Header_basket />
      <main>
        <Outlet />
      </main>
      <Footer_basket />
    </>
  );
};
