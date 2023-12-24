import React, { useState } from "react";
import { useSelector } from "react-redux";
import classes from "./slider.module.scss";
import { Link } from "react-router-dom";

import { ProductCart, CartColor } from "../../../helper/index";

export const SliderTop = () => {
  const [sliderIndex, setSliderIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);
  const totalSlides = 7;

  const filteredProductsTop = useSelector(
    (state) => state.products.filteredProductsTop
  );

  const nextSlide = () => {
    if (sliderIndex < totalSlides - 4) {
      setSliderIndex(sliderIndex + 1);
    }
    if (sliderIndex < totalSlides - 1 && window.innerWidth <= 767) {
      setSliderIndex(sliderIndex + 1);
    }
  };

  const prevSlide = () => {
    if (sliderIndex > 0) {
      setSliderIndex(sliderIndex - 1);
    }
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX && touchEndX) {
      const deltaX = touchStartX - touchEndX;
      if (deltaX > 50) {
        nextSlide();
      } else if (deltaX < -50) {
        prevSlide();
      }
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  const getTranslateSize = () => {
    if (window.innerWidth <= 768) {
      return `${sliderIndex * 103.3}%`;
    } else if (window.innerWidth <= 1024) {
      return `${sliderIndex * 31}%`;
    }
    return `${sliderIndex * 25}%`;
  };

  return (
    <div className={classes.sliderTop}>
      <div className={classes.wrapper}>
        <div className={classes.slider_navigate}>
          <div className={classes.slider_navigate_info}>
            <h2>Top Products</h2>
            <Link to="/products">
              <span>See All</span>
            </Link>
          </div>
          <div className={classes.slider_navigate_arrow}>
            <span className={classes.arrow_left} onClick={prevSlide}>
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
            <span className={classes.arrow_right} onClick={nextSlide}>
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
        <div
          className={classes.slider_carousel}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className={classes.carousel}
            style={{
              transform: `translateX(-${getTranslateSize()})`,
            }}
          >
            {filteredProductsTop?.map((product, index) => {
              const { id, img, rating, description, price, price_previous } =
                product;
              return (
                <ProductCart
                  id={id}
                  key={index}
                  img={img}
                  description={description}
                  rating={rating}
                  price={price}
                  price_previous={price_previous}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export const SliderMost = () => {
  const [sliderIndex, setSliderIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);
  const totalSlides = 7;

  const filteredProductsTop = useSelector(
    (state) => state.products.filteredProductsTop
  );

  const nextSlide = () => {
    if (sliderIndex < totalSlides - 4) {
      setSliderIndex(sliderIndex + 1);
    }
    if (sliderIndex < totalSlides - 1 && window.innerWidth <= 767) {
      setSliderIndex(sliderIndex + 1);
    }
  };

  const prevSlide = () => {
    if (sliderIndex > 0) {
      setSliderIndex(sliderIndex - 1);
    }
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX && touchEndX) {
      const deltaX = touchStartX - touchEndX;
      if (deltaX > 50) {
        nextSlide();
      } else if (deltaX < -50) {
        prevSlide();
      }
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  const getTranslateSize = () => {
    if (window.innerWidth <= 768) {
      return `${sliderIndex * 103}%`;
    } else if (window.innerWidth <= 1024) {
      return `${sliderIndex * 31}%`;
    }
    return `${sliderIndex * 25}%`;
  };

  return (
    <div className={classes.sliderTop}>
      <div className={classes.wrapper}>
        <div className={classes.slider_navigate}>
          <div className={classes.slider_navigate_info}>
            <h2>Most Products</h2>
            <Link to="/products">
              <span>See All</span>
            </Link>
          </div>
          <div className={classes.slider_navigate_arrow}>
            <span className={classes.arrow_left} onClick={prevSlide}>
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
            <span className={classes.arrow_right} onClick={nextSlide}>
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
        <div
          className={classes.slider_carousel}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className={classes.carousel}
            style={{
              transform: `translateX(-${getTranslateSize()})`,
            }}
          >
            {filteredProductsTop?.map((product, index) => {
              const { id, img, rating, description, price, price_previous } =
                product;
              return (
                <ProductCart
                  id={id}
                  key={index}
                  img={img}
                  description={description}
                  rating={rating}
                  price={price}
                  price_previous={price_previous}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export const SliderColor = () => {
  const [sliderIndex, setSliderIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);
  const totalSlides = 5;

  const productColor = useSelector((state) => state.productInfo.productColor);

  const nextSlide = () => {
    if (sliderIndex < totalSlides - 4) {
      setSliderIndex(sliderIndex + 1);
    }
    if (sliderIndex < totalSlides - 1 && window.innerWidth <= 767) {
      setSliderIndex(sliderIndex + 1);
    }
  };

  const prevSlide = () => {
    if (sliderIndex > 0) {
      setSliderIndex(sliderIndex - 1);
    }
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX && touchEndX) {
      const deltaX = touchStartX - touchEndX;
      if (deltaX > 50) {
        nextSlide();
      } else if (deltaX < -50) {
        prevSlide();
      }
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  const getTranslateSize = () => {
    if (window.innerWidth <= 768) {
      return `${sliderIndex * 103}%`;
    } else if (window.innerWidth <= 1024) {
      return `${sliderIndex * 31}%`;
    }
    return `${sliderIndex * 53}%`;
  };

  return (
    <div className={classes.sliderColor}>
      <div className={classes.wrapper}>
        <div className={classes.slider_navigate}>
          {productColor.length > 1 ? (
            <div className={classes.slider_navigate_arrow}>
              <span className={classes.arrow_left} onClick={prevSlide}>
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
              <span className={classes.arrow_right} onClick={nextSlide}>
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
        <div
          className={classes.slider_carousel}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className={classes.carousel}
            style={{
              transform: `translateX(-${getTranslateSize()})`,
            }}
          >
            {productColor?.map((product, index) => {
              const { id, img } = product;

              return <CartColor productId={id} img={img} key={index} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
