import React, { useEffect, useRef, useState } from "react";
import classes from "./products.module.scss";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { Helmet } from "react-helmet-async";
import Search from "../../components/UI/Search/Search";
import BannerProduct from "../../components/UI/Banner/Banner";
import Catalog from "../../components/Regular/catalog/Catalog";
import { ButtonScroll } from "../../helper";
import { useAppSelector, useAppDisptach } from "../../redux/store/hook";
import { fetchgetBanner } from "../../redux/allRequests/allRequests";

const Products: React.FC = () => {
  const [toggleFilter, setToggleFilter] = useState(false);
  const location = useLocation();
  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1));

  const { getBanner } = useAppSelector((state) => state.allRequests);

  const dispatch = useAppDisptach();

  useEffect(() => {
    dispatch(fetchgetBanner());
  }, [dispatch]);

  return (
    <>
      <div style={toggleFilter ? { overflow: "hidden", height: "100vh" } : {}}>
        <ButtonScroll />

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
        <BannerProduct banner={getBanner} />
        <Catalog
          toggleFilter={toggleFilter}
          setToggleFilter={setToggleFilter}
        />
      </div>
    </>
  );
};

export default Products;
