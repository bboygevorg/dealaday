import React from "react";
import { Link } from "react-router-dom";
import classes from "./addWishList.module.scss";

interface WatchGoodProps {
  productId: string;
  addToWishList: () => void;
}

export const WatchGood: React.FC<WatchGoodProps> = ({ productId }) => {
  return (
    <>
      <Link to={`/products/${productId}`}>
        <div className={classes.watch}>
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill=""
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.28 11.5682C11.5842 11.5682 11.0202 12.1279 11.0202 12.8182C11.0202 13.5086 11.5842 14.0682 12.28 14.0682C12.9758 14.0682 13.5399 13.5086 13.5399 12.8182C13.5399 12.1279 12.9758 11.5682 12.28 11.5682ZM9.50842 12.8182C9.50842 11.2995 10.7493 10.0682 12.28 10.0682C13.8107 10.0682 15.0516 11.2995 15.0516 12.8182C15.0516 14.337 13.8107 15.5682 12.28 15.5682C10.7493 15.5682 9.50842 14.337 9.50842 12.8182Z"
              fill=""
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.07656 12.8182C5.63933 17.0859 8.71352 19.0682 12.28 19.0682C15.8465 19.0682 18.9207 17.0859 21.4835 12.8182C18.9207 8.55055 15.8465 6.56824 12.28 6.56824C8.71352 6.56824 5.63933 8.55055 3.07656 12.8182ZM1.54516 12.4461C4.31508 7.63681 7.88575 5.06824 12.28 5.06824C16.6743 5.06824 20.245 7.63681 23.0149 12.4461C23.1477 12.6767 23.1477 12.9598 23.0149 13.1904C20.245 17.9997 16.6743 20.5682 12.28 20.5682C7.88575 20.5682 4.31508 17.9997 1.54516 13.1904C1.41236 12.9598 1.41236 12.6767 1.54516 12.4461Z"
              fill=""
            />
          </svg>
        </div>
      </Link>
    </>
  );
};
