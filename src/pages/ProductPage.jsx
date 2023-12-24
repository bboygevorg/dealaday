import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation, useParams, Link } from "react-router-dom";
import { InputWhite } from "../components/Input/input";
import ProductsInfo from "../components/Regular/productInfo/ProductsInfo";
import { useDispatch, useSelector } from "react-redux";
import { getGoodsId, setSelectedProduct } from "../redux/product/product";

const ProductPage = () => {
  const { id } = useParams();
  const location = useLocation();

  const dispatch = useDispatch();
  const selectedProduct = useSelector(
    (state) => state.productInfo.selectedProduct
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
    dispatch(getGoodsId(id));

    return () => {
      dispatch(setSelectedProduct(null));
    };
  }, [dispatch, id]);

  return (
    <div>
      <Helmet>
        <title>{productName || id}</title>
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
            <span key={index}>{segment}</span>
          ))}
        </div>
      </div>
      <ProductsInfo />
    </div>
  );
};

export default ProductPage;
