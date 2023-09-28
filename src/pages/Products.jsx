import React from "react";
import { useLocation } from "react-router";
import { Helmet } from "react-helmet-async";

const Products = () => {
  const location = useLocation();

  console.log("Current location:", location);
  return (
    <>
      <div>
        <Helmet>
          <title>Products</title>
        </Helmet>
        <div>1</div>
      </div>
    </>
  );
};

export default Products;
