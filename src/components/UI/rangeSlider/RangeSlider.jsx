import React, { useRef, useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedPriceRange,
  getFilteredProducts,
  setCurrentPage,
} from "../../../redux/initialGoods/initialGoods";
import classes from "./rangeSlider.module.scss";

const RangeSlider = ({ min, max }) => {
  const dispatch = useDispatch();
  const {
    selectedPriceRange,
    selectedCategory,
    selectedBrand,
    selectedRating,
    selectedColors,
    currentPage,
  } = useSelector((state) => state.products);
  const [minVal, setMinVal] = useState(selectedPriceRange[0]);
  const [maxVal, setMaxVal] = useState(selectedPriceRange[1]);
  const minValRef = useRef(null);
  const maxValRef = useRef(null);
  const range = useRef(null);

  // const delayedFunction = (func, delay) => {
  //   setTimeout(() => {
  //     func();
  //   }, delay);
  // };

  const handlePriceRangeChange = () => {
    const newPage = 1;
    dispatch(setSelectedPriceRange([minVal, maxVal]));
    dispatch(
      getFilteredProducts({
        category: selectedCategory,
        brand: selectedBrand,
        rating: selectedRating,
        minPrice: minVal,
        maxPrice: maxVal,
        color: selectedColors,
        page: currentPage,
      })
    );

    dispatch(setCurrentPage({ page: newPage }));
  };

  const handleMinValChange = (event) => {
    const value = Math.min(+event.target.value, maxVal - 1);
    setMinVal(value);
    event.target.value = value.toString();
    handlePriceRangeChange();
  };

  const handleMaxValChange = (event) => {
    const value = Math.max(+event.target.value, minVal + 1);
    setMaxVal(value);
    event.target.value = value.toString();
    handlePriceRangeChange();
  };

  // Convert to percentage
  const getPercent = useCallback(
    (value) => {
      return Math.round(((value - 0) / (1000 - 0)) * 100);
    },
    [0, 1000]
  );

  // // Set width of the range to decrease from the left side
  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value); // Preceding with '+' converts the value from type string to type number

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, getPercent]);

  return (
    <div className={classes.slider_container}>
      <div className={classes.slider}>
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          ref={minValRef}
          onChange={handleMinValChange}
          className={`${classes.thumb} ${classes.thumb_zindex_3}
          } ${minVal > max - 100 ? classes.thumb_zindex_5 : ""}`}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          ref={maxValRef}
          onChange={handleMaxValChange}
          className={`${classes.thumb} ${classes.thumb_zindex_4}`}
        />
        <div className={classes.slider_track} />
        <div className={classes.slider_range} ref={range} />
        <div className={classes.slider_left_value}>{minVal}</div>
        <div className={classes.slider_right_value}>{maxVal}</div>
      </div>
    </div>
  );
};

export default RangeSlider;
