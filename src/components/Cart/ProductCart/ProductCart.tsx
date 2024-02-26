import React, { useState } from "react";
import classes from "./productCart.module.scss";
import { getStarRaiting } from "../../../helper/star";

import { Reviews, WatchGood, WishList } from "../../../helper/index";
import Button from "../../UI/Button/Button";
import Price from "../../Regular/price/Price";

const position = {
  top: `${10}rem`,
};

interface SliderProduct {
  id: string;
  title: string;
  img: string;
  rating: number;
  price: number;
  price_previous: number;
}

const ProductCart: React.FC<SliderProduct> = ({
  id,
  title,
  img,
  rating,
  price,
  price_previous,
}) => {
  const [active, setActive] = useState(false);

  const handleHover = () => {
    setActive(true);
  };

  const handleMouseLeave = () => {
    setActive(false);
  };

  return (
    <div
      className={classes.product_cart}
      onMouseEnter={handleHover}
      onMouseLeave={handleMouseLeave}
    >
      {active && (
        <div className={classes.addTo} style={position}>
          <div className={classes.addTo_top}>
            <WatchGood productId={id} />
            <WishList />
          </div>
          <div className={classes.addTo_bottom}>
            <Button
              color="#ffffff"
              backgroundButton="#3598cc"
              padding="0.5rem 0.8rem"
              hover="blue"
              handleOfFilter={() => console.log("worked")}
            >
              Add to cart
            </Button>
          </div>
        </div>
      )}
      <div className={classes.product_cart_picture}>
        <img src={img} alt="" />
      </div>
      <div className={classes.product_cart_info}>
        <p className={classes.product_cart_info_text}>{title}</p>
        <div className={classes.oneCart_info_raiting}>
          <div>{getStarRaiting(rating)}</div>
          <span className={classes.review}>
            <Reviews />
          </span>
        </div>
        <div className={classes.oneCart_info_delivery}>
          <div>
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.83329 13.5227C5.18896 13.5227 4.66663 14.0451 4.66663 14.6894C4.66663 15.3337 5.18896 15.8561 5.83329 15.8561C6.47762 15.8561 6.99996 15.3337 6.99996 14.6894C6.99996 14.0451 6.47762 13.5227 5.83329 13.5227ZM3.66663 14.6894C3.66663 13.4928 4.63668 12.5227 5.83329 12.5227C7.02991 12.5227 7.99996 13.4928 7.99996 14.6894C7.99996 15.886 7.02991 16.8561 5.83329 16.8561C4.63668 16.8561 3.66663 15.886 3.66663 14.6894Z"
                fill="#6B7280"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.1667 13.5227C13.5223 13.5227 13 14.0451 13 14.6894C13 15.3337 13.5223 15.8561 14.1667 15.8561C14.811 15.8561 15.3333 15.3337 15.3333 14.6894C15.3333 14.0451 14.811 13.5227 14.1667 13.5227ZM12 14.6894C12 13.4928 12.97 12.5227 14.1667 12.5227C15.3633 12.5227 16.3333 13.4928 16.3333 14.6894C16.3333 15.886 15.3633 16.8561 14.1667 16.8561C12.97 16.8561 12 15.886 12 14.6894Z"
                fill="#6B7280"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.33333 5.18941C3.24493 5.18941 3.16014 5.22453 3.09763 5.28704C3.03512 5.34955 3 5.43434 3 5.52274V14.1894H4.16667C4.44281 14.1894 4.66667 14.4133 4.66667 14.6894C4.66667 14.9655 4.44281 15.1894 4.16667 15.1894H2.5C2.22386 15.1894 2 14.9655 2 14.6894V5.52274C2 5.16912 2.14048 4.82998 2.39052 4.57993C2.64057 4.32988 2.97971 4.18941 3.33333 4.18941H10.8333C11.1095 4.18941 11.3333 4.41326 11.3333 4.68941V5.02274H15C15.1756 5.02274 15.3384 5.11489 15.4287 5.26549L17.9287 9.43216C17.9754 9.50987 18 9.59879 18 9.68941V14.6894C18 14.9655 17.7761 15.1894 17.5 15.1894H15.8333C15.5572 15.1894 15.3333 14.9655 15.3333 14.6894C15.3333 14.4133 15.5572 14.1894 15.8333 14.1894H17V10.1894H11.3333V14.1894H12.5C12.7761 14.1894 13 14.4133 13 14.6894C13 14.9655 12.7761 15.1894 12.5 15.1894H7.5C7.22386 15.1894 7 14.9655 7 14.6894C7 14.4133 7.22386 14.1894 7.5 14.1894H10.3333V5.18941H3.33333ZM11.3333 6.02274V9.18941H16.6169L14.7169 6.02274H11.3333Z"
                fill="#6B7280"
              />
            </svg>
          </div>
          <span className={classes.delivery_info}>2-3 day(s)</span>
        </div>
        <Price price={price} price_previous={price_previous} margin="right" />
      </div>
    </div>
  );
};

export default ProductCart;
