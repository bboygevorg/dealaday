import React, { useEffect } from "react";
import classes from "./productPage.module.scss";
import { Helmet } from "react-helmet-async";
import { useLocation, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedProduct,
  getProductInfo,
} from "../../redux/productInfo/productInfo";

import { Product, Search } from "../../helper/index";
import { RootState } from "../../redux/store/store";

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const dispatch = useDispatch();

  const { selectedProduct } = useSelector(
    (state: RootState) => state.productInfo
  );

  const productName = selectedProduct?.name;

  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment !== "products");

  const idIndex = pathSegments.findIndex((segment) => segment === id);

  if (idIndex !== -1) {
    pathSegments[idIndex] = productName;
  }

  useEffect(() => {
    if (id) {
      dispatch(getProductInfo(id) as any);
    }

    return () => {
      dispatch(setSelectedProduct(null));
    };
  }, [dispatch, id]);

  return (
    <div>
      <Helmet>
        <title>{productName || id}</title>
      </Helmet>
      <div className={classes.productPage_search}>
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

          <Link to="/products">
            <span>Products</span>
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
            <span style={{ color: "#a2a9b4" }} key={index}>
              {segment}
            </span>
          ))}
        </div>
      </div>
      <Product />
    </div>
  );
};

export default ProductPage;
