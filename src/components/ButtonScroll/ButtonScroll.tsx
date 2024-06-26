import React, { useCallback, useEffect, useState } from "react";
import classes from "./buttonScroll.module.scss";

const ButtonScroll = () => {
  const [scrollPage, setScrolledPages] = useState(0);

  const handleScroll = useCallback(() => {
    const windowHeight = window.innerHeight;
    const scrollTop =
      window.scrollY ||
      document.body.scrollTop +
        ((document.documentElement && document.documentElement.scrollTop) || 0);

    const currentPage = Math.ceil(scrollTop / windowHeight);

    setScrolledPages(currentPage);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {scrollPage > 1 ? (
        <button
          onClick={handleScrollToTop}
          className={classes.scrollToTopButton}
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
                d="M6 15L12 9L18 15"
                stroke=""
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
      ) : (
        ""
      )}
    </>
  );
};

export default ButtonScroll;
