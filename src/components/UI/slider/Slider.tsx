import React, { useRef } from "react";
import classes from "./slider.module.scss";
import { Link } from "react-router-dom";
import SliderSlick from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Product } from "../../../redux/allRequests/types";

import { ProductCart } from "../../../helper/index";

const Slider: React.FC<{
  sliderProduct: Product[];
  sliderName: string;
}> = ({ sliderProduct, sliderName }) => {
  const sliderRef = useRef<SliderSlick>(null);

  const settings = {
    infinite: true,
    autoplay: false,
    arrows: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  return (
    <div className={classes.slider}>
      <div className={classes.wrapper}>
        <div className={classes.slider_navigate}>
          <div className={classes.slider_navigate_info}>
            <h2>{sliderName}</h2>
            <Link to="/products">
              <span>See All</span>
            </Link>
          </div>
          <div className={classes.slider_navigate_arrow}>
            <span className={classes.arrow_left} onClick={handlePrev}>
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
            </span>
            <span className={classes.arrow_right} onClick={handleNext}>
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
                    stroke=""
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
            </span>
          </div>
        </div>
        <SliderSlick ref={sliderRef} {...settings}>
          {sliderProduct?.map((product, index) => {
            const { _id, img, title, rating, price, price_previous } =
              product.productId;
            return (
              <div key={index} className={classes.slider_carousel}>
                <div className={classes.carousel}>
                  <ProductCart
                    key={_id}
                    id={_id}
                    img={img}
                    rating={rating}
                    title={title}
                    price={price}
                    price_previous={price_previous}
                  />
                </div>
              </div>
            );
          })}
        </SliderSlick>
      </div>
    </div>
  );
};

export default Slider;
