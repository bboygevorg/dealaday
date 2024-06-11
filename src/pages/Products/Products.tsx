import React, { useEffect, useState } from "react";
import classes from "./products.module.scss";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import BannerProduct from "../../components/Ui/Banner/Banner";
import Catalog from "../../components/Regular/catalog/Catalog";
import { ButtonScroll, Search } from "../../helper";
import { useAppSelector, useAppDisptach } from "../../redux/store/hook";
import { fetchgetBanner } from "../../redux/allRequests/allRequests";
import ArrowNavigate from "../../helper/arrowNavigate";

const Products: React.FC = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const { getBanner } = useAppSelector((state) => state.allRequests);

  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1));

  const dispatch = useAppDisptach();

  if (toggleMenu) {
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    dispatch(fetchgetBanner());
  }, [dispatch]);

  return (
    <>
      <div style={toggleMenu ? { overflow: "hidden", height: "100vh" } : {}}>
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

            <ArrowNavigate />

            {pathSegments.map((segment, index) => (
              <span key={index}>{segment}</span>
            ))}
          </div>
        </div>
        <BannerProduct banner={getBanner} />
        <Catalog toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} />
      </div>
    </>
  );
};

export default Products;
