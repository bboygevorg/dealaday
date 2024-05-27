import React from "react";
import classes from "./pageNotFound.module.scss";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import notFound from "../../assets/img/404.jpg";

const PageNotFound = () => {
  const location = useLocation();
  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1));
  return (
    <div>
      <Helmet>
        <title>404 Not found</title>
      </Helmet>
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

      <div className={classes.pageNotFound}>
        <img src={notFound} alt="" />
      </div>
    </div>
  );
};

export default PageNotFound;
