import React, { useRef } from "react";
import classes from "./productColorSlider.module.scss";
import SliderSlick from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CartColor } from "../../../helper";

interface ColorType {
  _id: string;
  img: string;
}

const ProductColorSlider: React.FC<{ productColor: ColorType[] }> = ({
  productColor,
}) => {
  const sliderRef = useRef<SliderSlick>(null);

  const settings = {
    infinite: true,
    autoplay: false,
    arrows: false,
    touchMove: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          touchMove: true,
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          touchMove: true,
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
    console.log(sliderRef.current);
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
    console.log(sliderRef.current);
  };

  return (
    <div className={classes.sliderColor}>
      <div className={classes.wrapper}>
        <div className={classes.slider_navigate}>
          {productColor.length > 1 ? (
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
          ) : (
            ""
          )}
        </div>

        {productColor.length > 1 ? (
          <SliderSlick ref={sliderRef} {...settings}>
            {productColor?.map((product, index) => {
              const { _id, img } = product;
              return (
                <div key={index} className={classes.slider_carousel}>
                  <div className={classes.carousel}>
                    <CartColor productId={_id} img={img} key={index} />
                  </div>
                </div>
              );
            })}
          </SliderSlick>
        ) : (
          <>
            {productColor?.map((product, index) => {
              const { _id, img } = product;
              return (
                <div key={index} className={classes.slider_carousel}>
                  <div className={classes.carousel}>
                    <CartColor productId={_id} img={img} key={index} />
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductColorSlider;
