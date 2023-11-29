import React from "react";
import classes from "./pagination.module.scss";

const Pagination = ({ currentPage, onPageChange, totalProductsCount }) => {
  const handleClick = (page) => {
    onPageChange(page);
  };

  const startIndex = totalProductsCount;
  const pageNumbers = Math.ceil(startIndex / 12);

  const renderPageNumbers = () => {
    const pageNumbersArray = [];

    for (let i = 1; i <= pageNumbers; i++) {
      pageNumbersArray.push(
        <button
          key={i}
          onClick={() => handleClick(i)}
          className={i === currentPage ? classes.active : classes.page}
        >
          {i}
        </button>
      );
    }

    return pageNumbersArray;
  };

  return (
    <div className={classes.pagination}>
      <div className={classes.container}>
        <div className={classes.pagination_info}>
          Showing {(currentPage - 1) * 12 + 1} -{" "}
          {Math.min(currentPage * 12, startIndex)} of {startIndex} Products
        </div>
        <div className={classes.pagination_control}>
          <button
            className={`${classes.prev_page} ${
              currentPage === 1 ? classes.disabled : ""
            }`}
            onClick={() => handleClick(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_4511_4999)">
                <path
                  d="M15 6L9 12L15 18"
                  stroke="#111827"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_4511_4999">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
          {renderPageNumbers()}
          <button
            className={`${classes.next_page} ${
              currentPage === pageNumbers ? classes.disabled : ""
            }`}
            onClick={() => handleClick(currentPage + 1)}
            disabled={currentPage === pageNumbers}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_4511_6955)">
                <path
                  d="M9 6L15 12L9 18"
                  stroke="#111827"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_4511_6955">
                  <rect
                    width="24"
                    height="24"
                    fill="white"
                    transform="matrix(-1 0 0 1 24 0)"
                  />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
