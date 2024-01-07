import React, { useEffect, useRef, useState } from "react";
import classes from "./cart.module.scss";

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(1);
  const dropdownRef = useRef(null);

  const handleDropdownClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }

    console.log(!dropdownRef.current.contains(event.target));
  };

  console.log(dropdownRef.current);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={classes.cart_container}>
      <div className={classes.cart_info}>
        <h3>Quantity:</h3>

        <div className={classes.custom_dropdown} ref={dropdownRef}>
          <div
            className={classes.selected_option}
            onClick={handleDropdownClick}
          >
            {selectedOption}
            <div className={classes.arrow}></div>
          </div>
          <div
            className={`${classes.options} ${
              isOpen ? classes.display_options : ""
            }`}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((option) => {
              return (
                <div
                  key={option}
                  className={classes.option}
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
