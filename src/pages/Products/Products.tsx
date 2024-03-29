import React, { useEffect, useState } from "react";
import classes from "./products.module.scss";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { Helmet } from "react-helmet-async";
import Search from "../../components/UI/Search/Search";
import BannerProduct from "../../components/UI/Banner/Banner";
import Catalog from "../../components/Regular/catalog/Catalog";
import axios from "axios";

const Products = () => {
  const [banner, setBanner] = useState([]);
  const location = useLocation();
  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1));

  const getBanner = async () => {
    try {
      const { data } = await axios("http://localhost:5000/banner");
      setBanner(data);
    } catch (error) {
      console.log("Error fetching deals banner:", error);
    }
  };

  useEffect(() => {
    getBanner();
  }, []);

  return (
    <>
      <div>
        <Helmet>
          <title>Products</title>
        </Helmet>
        <div className={classes.product_search}>
          <Search
            stroke="#3598cc"
            inputbackgroundColor=""
            borderInputColor="#d1d5db"
            logoBackgroundColor="#f9fafb"
            logoBorderColor="#d1d5db"
            color=""
          />
        </div>

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
        <BannerProduct banner={banner} />
        <Catalog />
      </div>
    </>
  );
};

export default Products;
