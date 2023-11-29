import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import classes from "./sort.module.scss";
import { handleOutsideClick } from "../../../helper/handleOutsideClick";

const Sort = ({ onSortChange }) => {
  const [sortingOption, setSortingOption] = useState("Default");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleRef = useRef(null);

  const handleSortingChange = (event, criterion) => {
    if (event.target) {
      const selectedValue = event.target.dataset.value;
      if (selectedValue) {
        setSortingOption(selectedValue);
        setIsDropdownOpen(false);
        onSortChange(criterion);
      }
    }
  };

  const toggleDropDown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const toggleMenu = handleOutsideClick(toggleRef, () => {
      setIsDropdownOpen(false);
    });

    const element = toggleRef.current;

    element.addEventListener("click", toggleMenu);

    return () => {
      if (element) {
        element.removeEventListener("click", toggleMenu);
      }
    };
  }, []);

  return (
    <div className={classes.dropdown}>
      <div
        className={classes.dropdown_trigger}
        onClick={toggleDropDown}
        ref={toggleRef}
      >
        <span>{sortingOption}</span>
        <i
          className={`${classes.arrow} ${
            isDropdownOpen ? classes.arrow_up : classes.arrow_down
          }`}
        ></i>
      </div>
      <ul
        className={`${classes.dropdown_menu} ${
          isDropdownOpen ? classes.open : ""
        }`}
      >
        <li
          data-value="Default"
          className={sortingOption === "Default" ? classes.selectedColor : ""}
          onClick={handleSortingChange}
        >
          Default
        </li>
        <li
          data-value="Featured"
          className={sortingOption === "Featured" ? classes.selectedColor : ""}
          onClick={handleSortingChange}
        >
          Featured
        </li>
        <li
          data-value="Customer Rating"
          className={
            sortingOption === "Customer Rating" ? classes.selectedColor : ""
          }
          onClick={handleSortingChange}
        >
          Customer Rating
        </li>
        <li
          data-value="Price Lowest First"
          className={
            sortingOption === "Price Lowest First" ? classes.selectedColor : ""
          }
          onClick={(event) => handleSortingChange(event, "Price Lowest First")}
        >
          Price Lowest First
        </li>
        <li
          data-value="Price Highest First"
          className={
            sortingOption === "Price Highest First" ? classes.selectedColor : ""
          }
          onClick={(event) => handleSortingChange(event, "Price Highest First")}
        >
          Price Highest First
        </li>
        <li
          data-value="Product Name A-Z"
          className={
            sortingOption === "Product Name A-Z" ? classes.selectedColor : ""
          }
          onClick={(event) => handleSortingChange(event, "Product Name A-Z")}
        >
          Product Name A-Z
        </li>
        <li
          data-value="Product Name Z-A"
          className={
            sortingOption === "Product Name Z-A" ? classes.selectedColor : ""
          }
          onClick={(event) => handleSortingChange(event, "Product Name Z-A")}
        >
          Product Name Z-A
        </li>
        <li
          data-value="Highest % Discount"
          className={
            sortingOption === "Highest % Discount" ? classes.selectedColor : ""
          }
          onClick={handleSortingChange}
        >
          Highest % Discount
        </li>
      </ul>
    </div>
  );
};

export default Sort;
