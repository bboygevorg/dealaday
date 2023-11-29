import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { Helmet } from "react-helmet-async";
import { InputWhite } from "../components/Input/input";
import BannerProduct from "../components/UI/Banner/bannerProduct/BannerProduct";
import Catalog from "../components/Regular/catalog/Catalog";

const Products = () => {
  const location = useLocation();
  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment);

  return (
    <>
      <div>
        <Helmet>
          <title>Products</title>
        </Helmet>
        <InputWhite />
        <div className="navigate">
          <div className="container">
            <Link to="/">
              <span>Home</span>
            </Link>

            <span>
              <svg
                width="8"
                height="12"
                viewBox="0 0 8 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.5 1L6.5 6L1.5 11"
                  stroke="#9CA3AF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            {pathSegments.map((segment, index) => (
              <span key={index}>{segment}</span>
            ))}
          </div>
        </div>
        <BannerProduct />
        <Catalog />
      </div>
    </>
  );
};

export default Products;
