import React, { useState, useRef, useEffect } from "react";
import classes from "./filter.module.scss";
import { RangeSlider, Button } from "../../../../helper/index";
import axios from "axios";
import { apiUrl } from "../../../../helper/env";

interface FilterProps {
  toggleActive: () => void;
  toggleFilter: boolean;
  closeFilterBar: () => void;
  onCategoryChange: (category: string) => void;
  onBrandChange: (brand: string) => void;
  onRatingChange: (rating: number) => void;
  onPriceRange: (
    minPrice: number[],
    maxPrice: number[],
    newPage: number
  ) => void;
  onColorsChange: (color: string) => void;
  searchParams: any;
  setSearchParams: any;
  totalProductsCount: number;
  selectedRating: number[];
  selectedBrand: string[];
  selectedCategory: string[];
}

const Filter: React.FC<FilterProps> = ({
  toggleActive,
  toggleFilter,
  closeFilterBar,
  onCategoryChange,
  onBrandChange,
  onRatingChange,
  onPriceRange,
  onColorsChange,
  searchParams,
  setSearchParams,
  totalProductsCount,
  selectedRating,
  selectedBrand,
  selectedCategory,
}) => {
  const [selectedColor, setSelectedColor] = useState<number[]>([]);
  const [filterCategory, setFilterCategory] = useState<any[]>([]);
  const [filterBrands, setFilterBrands] = useState<any[]>([]);
  const [filterColor, setFilterColor] = useState<any[]>([]);
  const [showAll, setShowAll] = useState(false);

  const handleTogglwShowAll = () => {
    setShowAll(!showAll);
  };

  const brandsShow = showAll ? filterBrands : filterBrands.slice(0, 5);

  const colorsContainerRef = useRef(null);
  const rating = [5, 4, 3, 2, 1];

  const fetchAllProducts = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/product/products?page_limit=${totalProductsCount}`
      );
      const allProducts = response.data;
      const uniqueCategories = Array.from(
        new Set(allProducts.map((item: any) => item.category))
      );
      const uniqueBrands = Array.from(
        new Set(allProducts.map((item: any) => item.brand))
      );
      const uniqueColor = Array.from(
        new Set(allProducts.map((item: any) => item.color))
      );
      setFilterCategory(uniqueCategories);
      setFilterBrands(uniqueBrands);
      setFilterColor(uniqueColor);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    if (params.hasOwnProperty("category")) {
      const categoriesFromURL = params["category"].split(",");
      handleChangeCategory(categoriesFromURL);
    }
    // if (params.hasOwnProperty("category")) {
    //   const categoryFromURL = params["category"];
    //   handleChange(categoryFromURL);
    // }
    // if (params.hasOwnProperty("color")) {
    //   // Get the value of the "color" key
    //   const colorFromURL = params["color"];
    //   // Call handleColorsChange with the color parameter from URL
    //   handleColorsChange(colorFromURL);
    // }
  }, []);

  // To correct
  const handleChangeCategory = (category: any) => {
    setSearchParams((prevSearchParams: any) => {
      const newSearchParams = new URLSearchParams(prevSearchParams);
      const existingCategories =
        newSearchParams.get("category")?.split(",") || [];

      if (!existingCategories.includes(category)) {
        existingCategories.push(category);
      }

      console.log(existingCategories);

      newSearchParams.set("category", existingCategories.join(","));
      return newSearchParams;
    });
    const categoriesFromURL = new URLSearchParams(window.location.search).get(
      "category"
    );

    // if (categoriesFromURL) {
    //   const categoriesArray = categoriesFromURL.split(",");
    //   categoriesArray.forEach((category) => {
    //     onCategoryChange(category);
    //   });
    // }

    onCategoryChange(category);
  };

  // const handleChangeCategory = (category: any) => {
  //   setSearchParams((prevSearchParams: any) => {
  //     const newSearchParams = new URLSearchParams(prevSearchParams);
  //     newSearchParams.set("category", category);
  //     return newSearchParams;
  //   });
  //   const catgoryFromURL = new URLSearchParams(window.location.search).get(
  //     "category"
  //   );
  //   if (catgoryFromURL) onCategoryChange(catgoryFromURL);
  // };

  // To correct
  const handleBrandChange = (brand: string) => {
    setSearchParams((prevSearchParams: any) => {
      const newSearchParams = new URLSearchParams(prevSearchParams);

      newSearchParams.set("brand", brand);
      return newSearchParams;
    });
    const params = new URLSearchParams(window.location.search);
    const brandFromURL = params.get("brand");

    if (brandFromURL !== null) {
      onBrandChange(brandFromURL);
    }
  };

  // To correct
  const handleRatingChange = (rating: number) => {
    setSearchParams((prevSearchParams: any) => {
      const newSearchParams = new URLSearchParams(prevSearchParams);

      newSearchParams.set("rating", rating.toString());
      return newSearchParams;
    });
    const params = new URLSearchParams(window.location.search);
    const ratingFromURL = params.get("rating");

    if (ratingFromURL !== null) {
      onRatingChange(rating);
    }
  };

  // To correct
  const handleColorsChange = (color: string) => {
    setSearchParams((prevSearchParams: any) => {
      const newSearchParams = new URLSearchParams(prevSearchParams);
      newSearchParams.set("color", color);
      return newSearchParams;
    });

    const params = new URLSearchParams(window.location.search);
    const colorFromURL = params.get("color");

    if (colorFromURL !== null) {
      onColorsChange(colorFromURL);
    }
  };

  // To correct
  const stars = (number: number) => {
    const starIcon = [];
    const maxStars = 5;
    for (let i = 0; i < maxStars; i++) {
      if (i < number) {
        starIcon.push(
          <svg
            key={i}
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_2794_10638)">
              <path
                d="M8.72179 12.6516L4.57479 14.815L5.36697 10.233L2.00745 6.98829L6.64359 6.32162L8.71709 2.15295L10.7906 6.32162L15.4267 6.98829L12.0672 10.233L12.8594 14.815L8.72179 12.6516Z"
                fill="#FDBC00"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.71714 1.40295C9.00487 1.40295 9.26764 1.56503 9.39498 1.82103L11.2925 5.63596L15.5352 6.24604C15.8201 6.28701 16.0568 6.48498 16.1457 6.75664C16.2346 7.0283 16.1603 7.32649 15.954 7.52572L12.8795 10.4951L13.6044 14.6882C13.6531 14.9697 13.5364 15.2542 13.3035 15.4219C13.0705 15.5897 12.7617 15.6116 12.507 15.4785L8.72145 13.4992L4.92661 15.4788C4.67194 15.6117 4.36333 15.5895 4.13055 15.4217C3.89777 15.2539 3.78119 14.9695 3.82984 14.6882L4.55477 10.4951L1.48026 7.52572C1.27398 7.32649 1.19965 7.0283 1.28857 6.75664C1.37748 6.48498 1.61419 6.28701 1.89908 6.24604L6.14176 5.63596L8.0393 1.82103C8.16664 1.56503 8.42942 1.40295 8.71714 1.40295ZM8.71714 3.84764L7.32148 6.65354C7.21133 6.87499 6.99838 7.02845 6.75206 7.06387L3.63374 7.51227L5.89427 9.69552C6.07268 9.86784 6.15413 10.1163 6.11204 10.3598L5.57883 13.4439L8.37008 11.9878C8.59052 11.8728 8.8539 11.8729 9.07424 11.9881L11.8552 13.4421L11.3222 10.3598C11.2802 10.1163 11.3616 9.86784 11.54 9.69552L13.8005 7.51227L10.6822 7.06387C10.4359 7.02845 10.223 6.87499 10.1128 6.65354L8.71714 3.84764Z"
                fill="#FDBC00"
              />
            </g>
            <defs>
              <clipPath id="clip0_2794_10638">
                <rect
                  width="16.1257"
                  height="16"
                  fill="white"
                  transform="translate(0.658936 0.818237)"
                />
              </clipPath>
            </defs>
          </svg>
        );
      } else {
        starIcon.push(
          <svg
            key={i}
            width="18"
            height="17"
            viewBox="0 0 18 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.00463 12.6516L4.85763 14.815L5.64981 10.233L2.29028 6.98829L6.92642 6.32162L8.99992 2.15295L11.0734 6.32162L15.7096 6.98829L12.35 10.233L13.1422 14.815L9.00463 12.6516Z"
              fill="#D1D5DB"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.99998 1.40295C9.28771 1.40295 9.55048 1.56503 9.67782 1.82103L11.5754 5.63596L15.818 6.24604C16.1029 6.28701 16.3396 6.48498 16.4286 6.75664C16.5175 7.0283 16.4431 7.32649 16.2369 7.52572L13.1624 10.4951L13.8873 14.6882C13.936 14.9697 13.8193 15.2542 13.5863 15.4219C13.3533 15.5897 13.0445 15.6116 12.7899 15.4785L9.00428 13.4992L5.20945 15.4788C4.95477 15.6117 4.64616 15.5895 4.41338 15.4217C4.1806 15.2539 4.06403 14.9695 4.11268 14.6882L4.8376 10.4951L1.76309 7.52572C1.55681 7.32649 1.48249 7.0283 1.5714 6.75664C1.66032 6.48498 1.89703 6.28701 2.18192 6.24604L6.4246 5.63596L8.32214 1.82103C8.44948 1.56503 8.71225 1.40295 8.99998 1.40295ZM8.99998 3.84764L7.60432 6.65354C7.49417 6.87499 7.28121 7.02845 7.0349 7.06387L3.91657 7.51227L6.17711 9.69552C6.35552 9.86784 6.43697 10.1163 6.39487 10.3598L5.86166 13.4439L8.65292 11.9878C8.87336 11.8728 9.13674 11.8729 9.35707 11.9881L12.138 13.4421L11.6051 10.3598C11.563 10.1163 11.6444 9.86784 11.8229 9.69552L14.0834 7.51227L10.9651 7.06387C10.7187 7.02845 10.5058 6.87499 10.3956 6.65354L8.99998 3.84764Z"
              fill="#D1D5DB"
            />
          </svg>
        );
      }
    }

    return starIcon;
  };

  // To correct
  const handleClick = (index: number) => {
    setSelectedColor((prevSelectedColors) => {
      if (prevSelectedColors.includes(index)) {
        return prevSelectedColors.filter((colorIndex) => colorIndex !== index);
      } else {
        return [...prevSelectedColors, index];
      }
    });
  };

  return (
    <>
      <div className={`${classes.filter}`}>
        <div className={classes.filter_title}>
          <h2>All Product</h2>
        </div>
        <div className={classes.filter_button} onClick={toggleActive}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.66674 1.33337H10.3334C10.4294 1.36705 10.5164 1.42225 10.5878 1.49475C10.6592 1.56725 10.7131 1.65513 10.7452 1.75165C10.7774 1.84818 10.7871 1.95079 10.7735 2.05162C10.7598 2.15245 10.7233 2.24883 10.6667 2.33337L7.33341 6.00004V10.6667L4.66674 8.66671V6.00004L1.3334 2.33337C1.2768 2.24883 1.2403 2.15245 1.22669 2.05162C1.21309 1.95079 1.22274 1.84818 1.25491 1.75165C1.28709 1.65513 1.34093 1.56725 1.41231 1.49475C1.4837 1.42225 1.57073 1.36705 1.66674 1.33337Z"
              stroke="#6B7280"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <p>Filter</p>
        </div>
        <div className={classes.filter_product}>
          <div className={classes.categoriesFilter}>
            <h3>Categories</h3>
            <ul style={{ listStyleType: "none" }}>
              {filterCategory?.map((elem, index) => (
                <li key={index}>
                  <label>
                    <input
                      type="checkbox"
                      className={classes.style_checkbox}
                      checked={selectedCategory.includes(elem)}
                      onChange={() => handleChangeCategory(elem)}
                    />
                    <span className={classes.check_box}></span>
                    <span>{elem}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className={classes.brandsFilter}>
            <h3>Brand</h3>
            <ul style={{ listStyleType: "none" }}>
              {brandsShow?.map((elem, index) => (
                <li key={index}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedBrand.includes(elem)}
                      onChange={() => handleBrandChange(elem)}
                    />
                    <span className={classes.check_box}></span>
                    <span>{elem}</span>
                  </label>
                </li>
              ))}
              {filterBrands.length > 5 && (
                <li>
                  <span
                    onClick={handleTogglwShowAll}
                    style={{ fontSize: "14px", color: "#3598cc" }}
                  >
                    {showAll ? "Show Less" : "Show more"}
                  </span>
                </li>
              )}
            </ul>
          </div>
          <div className={classes.ratingFilter}>
            <h3>Rating</h3>
            <ul style={{ listStyleType: "none" }}>
              {rating?.map((num, index) => (
                <li key={index}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedRating.includes(num)}
                      onChange={() => handleRatingChange(num)}
                    />
                    <span className={classes.check_box}></span>
                    <span>{stars(num)}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className={classes.range}>
            <h3>Price Range</h3>

            <RangeSlider min={0} max={1000} priceRange={onPriceRange} />
          </div>
          <div className={classes.colorsFilter}>
            <h3>Colors</h3>
            <div className={classes.colors} ref={colorsContainerRef}>
              {filterColor.map((color, index) => (
                <span
                  key={index}
                  data-index={index}
                  style={{
                    backgroundColor: color,
                  }}
                  onClick={() => {
                    const encodedColor = encodeURIComponent(color);
                    handleColorsChange(encodedColor);
                    handleClick(index);
                  }}
                  className={`${
                    selectedColor.includes(index) ? classes.selected : ""
                  }`}
                >
                  {selectedColor.includes(index) && (
                    <span
                      className={classes.border_color}
                      style={{
                        boxShadow: `0 0 0 4px ${color}`,
                      }}
                    ></span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`${classes.filter_product_mobile} ${
          toggleFilter ? classes.active : classes.activeOff
        }`}
      >
        <div className={classes.mobile}>
          <div className={classes.back_menu} onClick={closeFilterBar}>
            <svg
              width="14"
              height="14"
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
            <span className={classes.back_menu_title}>Back</span>
          </div>
          <div className={classes.categoriesFilter}>
            <h3>Categories</h3>
            <ul>
              {filterCategory.map((elem, index) => (
                <li key={index}>
                  <label>
                    <input
                      type="checkbox"
                      className={classes.style_checkbox}
                      checked={selectedCategory.includes(elem)}
                      onChange={() => handleChangeCategory(elem)}
                    />
                    <span className={classes.check_box}></span>
                    <span>{elem}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className={classes.brandsFilter}>
            <h3>Brand</h3>
            <ul>
              {filterBrands?.map((elem, index) => (
                <li key={index}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedBrand.includes(elem)}
                      onChange={() => handleBrandChange(elem)}
                    />
                    <span className={classes.check_box}></span>
                    <span>{elem}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className={classes.ratingFilter}>
            <h3>Rating</h3>
            <ul>
              {rating?.map((num, index) => (
                <li key={index}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedRating.includes(num)}
                      onChange={() => handleRatingChange(num)}
                    />
                    <span className={classes.check_box}></span>
                    <span>{stars(num)}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className={classes.range}>
            <h3>Price Range</h3>

            <RangeSlider min={0} max={1000} priceRange={onPriceRange} />
          </div>
          <div className={classes.colorsFilter}>
            <h3>Colors</h3>
            <div className={classes.colors} ref={colorsContainerRef}>
              {filterColor.map((color, index) => (
                <span
                  key={index}
                  data-index={index}
                  style={{
                    position: "relative",
                    width: "1.9rem",
                    height: "1.9rem",
                    backgroundColor: color,
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    const encodedColor = encodeURIComponent(color);
                    handleColorsChange(encodedColor);
                    handleClick(index);
                  }}
                  className={`${
                    selectedColor.includes(index) ? classes.selected : ""
                  }`}
                >
                  {selectedColor.includes(index) && (
                    <span
                      style={{
                        content: "",
                        width: "2.1rem",
                        height: "2.1rem",
                        position: "absolute",
                        top: "-1px",
                        left: "-1.4px",
                        borderRadius: "50%",
                        transition: "box-shadow 0.5s ease",
                        opacity: 1,
                        boxShadow: `0 0 0 4px ${color}`,
                      }}
                    ></span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
        <span className={classes.gray_bar}></span>
        <div className={classes.button_filter}>
          <div>
            <Button
              color="#1f2937"
              padding="0.6rem 3.5rem"
              backgroundButton="#dedddd"
              hover=""
              buttonFunction={() => console.log("worked")}
            >
              Clear
            </Button>
          </div>
          <div>
            <Button
              color="#ffffff"
              padding="0.6rem 3.5rem"
              backgroundButton="#3598cc"
              hover="blue"
              buttonFunction={closeFilterBar}
            >
              Apply
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;
