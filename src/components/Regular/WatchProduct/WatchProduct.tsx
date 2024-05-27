import React from "react";
import classes from "./watchProduct.module.scss";
import { Link } from "react-router-dom";
import { Button } from "../../../helper";

interface Product {
  id: string;
  onClick: () => void;
  buttonFunction: () => void;
  style?: any;
}

const WatchProduct: React.FC<Product> = ({
  id,
  onClick,
  buttonFunction,
  style,
}) => {
  return (
    <div className={classes.addTo} style={style}>
      <div className={classes.addTo_top}>
        <Link to={`/products/${id}`}>
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
        <div className={classes.wish} onClick={onClick}>
          <svg
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.31799 2.31804C1.90012 2.7359 1.56865 3.23198 1.3425 3.77795C1.11635 4.32392 0.999954 4.90909 0.999954 5.50004C0.999954 6.09099 1.11635 6.67616 1.3425 7.22213C1.56865 7.7681 1.90012 8.26417 2.31799 8.68204L9.99999 16.364L17.682 8.68204C18.5259 7.83812 19 6.69352 19 5.50004C19 4.30656 18.5259 3.16196 17.682 2.31804C16.8381 1.47412 15.6935 1.00001 14.5 1.00001C13.3065 1.00001 12.1619 1.47412 11.318 2.31804L9.99999 3.63604L8.68199 2.31804C8.26413 1.90017 7.76805 1.5687 7.22208 1.34255C6.67611 1.1164 6.09095 1 5.49999 1C4.90904 1 4.32387 1.1164 3.7779 1.34255C3.23194 1.5687 2.73586 1.90017 2.31799 2.31804V2.31804Z"
              stroke=""
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className={classes.addTo_bottom}>
        <Button
          padding="0.9rem 1.2rem"
          backgroundButton="#3598cc"
          color="#ffffff"
          hover="blue"
          buttonFunction={buttonFunction}
        >
          Add to cart
        </Button>
      </div>
    </div>
  );
};

export default WatchProduct;
