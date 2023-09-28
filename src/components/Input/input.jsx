import React from "react";
import classes from "./input.module.scss";

export const InputGray = () => {
  return (
    <form className={classes.wrapper_inputGray}>
      <input
        type="text"
        className={classes.input_gray}
        placeholder="Search for products and brands"
      />
      <div className={classes.logo_search}>
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.5 16.5L11.5 11.5L16.5 16.5ZM13.1667 7.33333C13.1667 8.09938 13.0158 8.85792 12.7226 9.56565C12.4295 10.2734 11.9998 10.9164 11.4581 11.4581C10.9164 11.9998 10.2734 12.4295 9.56565 12.7226C8.85792 13.0158 8.09938 13.1667 7.33333 13.1667C6.56729 13.1667 5.80875 13.0158 5.10101 12.7226C4.39328 12.4295 3.75022 11.9998 3.20854 11.4581C2.66687 10.9164 2.23719 10.2734 1.94404 9.56565C1.65088 8.85792 1.5 8.09938 1.5 7.33333C1.5 5.78624 2.11458 4.30251 3.20854 3.20854C4.30251 2.11458 5.78624 1.5 7.33333 1.5C8.88043 1.5 10.3642 2.11458 11.4581 3.20854C12.5521 4.30251 13.1667 5.78624 13.1667 7.33333Z"
            stroke="#E5E7EB"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </form>
  );
};

export const InputWhite = () => {
  return (
    <form className={classes.wrapper_inputWhite}>
      <input
        type="text"
        className={classes.input_white}
        placeholder="Search for products and brands"
      />

      <div className={classes.logo_search}>
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.5 16.5L11.5 11.5L16.5 16.5ZM13.1667 7.33333C13.1667 8.09938 13.0158 8.85792 12.7226 9.56565C12.4295 10.2734 11.9998 10.9164 11.4581 11.4581C10.9164 11.9998 10.2734 12.4295 9.56565 12.7226C8.85792 13.0158 8.09938 13.1667 7.33333 13.1667C6.56729 13.1667 5.80875 13.0158 5.10101 12.7226C4.39328 12.4295 3.75022 11.9998 3.20854 11.4581C2.66687 10.9164 2.23719 10.2734 1.94404 9.56565C1.65088 8.85792 1.5 8.09938 1.5 7.33333C1.5 5.78624 2.11458 4.30251 3.20854 3.20854C4.30251 2.11458 5.78624 1.5 7.33333 1.5C8.88043 1.5 10.3642 2.11458 11.4581 3.20854C12.5521 4.30251 13.1667 5.78624 13.1667 7.33333Z"
            stroke=""
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </form>
  );
};
