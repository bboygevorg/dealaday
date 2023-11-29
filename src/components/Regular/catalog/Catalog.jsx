import React, { useState, useEffect } from "react";
import classes from "./catalog.module.scss";
import { useDispatch, useSelector } from "react-redux";

import {
  getGoods,
  setCurrentPage,
  setSelectedCategories,
  setSelectedBrand,
  setSelectedRating,
  setSelectedColors,
  getFilteredProducts,
  setSortingCriterion,
  setSortingOrder,
  getSortedProducts,
} from "../../../redux/initialGoods/initialGoods";

import Filter from "./filter/Filter";
import Sort from "../../UI/sort/Sort";
import ProductCart from "../../Cart/ProductCart/ProductCart";
import Pagination from "../../UI/pagination/Pagination";
import Loader from "../../UI/loader/Loader";

const Catalog = () => {
  const [toggleFilter, setToggleFilter] = useState(false);
  const dispatch = useDispatch();
  const {
    products,
    currentPage,
    selectedCategory,
    selectedBrand,
    selectedRating,
    selectedPriceRange,
    selectedColors,
    loading,
    sortingCriterion,
  } = useSelector((state) => state.products);

  const totalProductsCount = useSelector(
    (state) => state.products.totalProductsCount
  );

  // const delayedFunction = (callback, delay) => {
  //   const timeoutId = setTimeout(() => {
  //     callback();
  //   }, delay);

  //   return () => clearTimeout(timeoutId);
  // };

  const handlePageChange = (newPage) => {
    dispatch(setCurrentPage({ page: newPage }));
    dispatch(getGoods(newPage));
  };

  const handleCategoryChange = (category, newPage) => {
    const updatedSelecetedCategory = selectedCategory.includes(category)
      ? selectedCategory.filter((c) => c !== category)
      : [...selectedCategory, category];

    dispatch(setSelectedCategories(updatedSelecetedCategory));

    const newCurrentPage = newPage || 1;

    if (updatedSelecetedCategory.length === 0) {
      dispatch(getGoods(newCurrentPage));
    } else {
      dispatch(
        getFilteredProducts({
          category: updatedSelecetedCategory,
          brand: selectedBrand,
          rating: selectedRating,
          minPrice: selectedPriceRange[0],
          maxPrice: selectedPriceRange[1],
          color: selectedColors,
          page: newCurrentPage,
        })
      );
    }

    dispatch(setCurrentPage({ page: newCurrentPage }));
  };

  const handleBrandChange = (brand, newPage) => {
    const updatedSelecetedBrand = [...selectedBrand];

    if (updatedSelecetedBrand.includes(brand)) {
      updatedSelecetedBrand.splice(updatedSelecetedBrand.indexOf(brand), 1);
    } else {
      updatedSelecetedBrand.push(brand);
    }

    dispatch(setSelectedBrand(updatedSelecetedBrand));

    const newCurrentPage = 1;

    if (updatedSelecetedBrand.length === 0) {
      dispatch(getGoods(newCurrentPage));
    } else {
      dispatch(
        getFilteredProducts({
          category: selectedCategory,
          brand: updatedSelecetedBrand,
          rating: selectedRating,
          minPrice: selectedPriceRange[0],
          maxPrice: selectedPriceRange[1],
          color: selectedColors,
          page: newCurrentPage,
        })
      );
    }
    dispatch(setCurrentPage({ page: newCurrentPage }));
  };

  const handleRatingChange = (rating, newPage) => {
    const updatedSelecetedRating = [...selectedRating];
    if (updatedSelecetedRating.includes(rating)) {
      updatedSelecetedRating.splice(updatedSelecetedRating.indexOf(rating), 1);
    } else {
      updatedSelecetedRating.push(rating);
    }

    dispatch(setSelectedRating(updatedSelecetedRating));

    const newCurrentPage = 1;

    if (updatedSelecetedRating.length === 0) {
      dispatch(getGoods(newCurrentPage));
    } else {
      getFilteredProducts({
        category: selectedCategory,
        brand: selectedBrand,
        rating: updatedSelecetedRating,
        minPrice: selectedPriceRange[0],
        maxPrice: selectedPriceRange[1],
        color: selectedColors,
        page: newCurrentPage,
      });
    }
    dispatch(setCurrentPage({ page: newCurrentPage }));
  };

  const handleColorChange = (color, newPage) => {
    const updatedSelecetedColors = selectedColors.includes(color)
      ? selectedColors.filter((c) => c !== color)
      : [...selectedColors, color];

    dispatch(setSelectedColors(updatedSelecetedColors));

    const newCurrentPage = newPage || 1;

    if (updatedSelecetedColors.length === 0) {
      dispatch(getGoods(newCurrentPage));
    } else {
      dispatch(
        getFilteredProducts({
          category: selectedCategory,
          brand: selectedBrand,
          rating: selectedRating,
          minPrice: selectedPriceRange[0],
          maxPrice: selectedPriceRange[1],
          color: updatedSelecetedColors,
          page: newCurrentPage,
        })
      );
    }

    dispatch(setCurrentPage({ page: newCurrentPage }));
  };

  const handleSortChange = (criterion, newPage) => {
    const currentSortingCriterion = sortingCriterion;
    const selectedPage = newPage || currentPage;

    dispatch(setSortingCriterion(criterion));
    dispatch(setCurrentPage({ page: selectedPage }));
    dispatch(
      getSortedProducts({
        criterion,
        page: selectedPage,
        sortingCriterion: currentSortingCriterion,
      })
    );
  };

  useEffect(() => {
    if (
      selectedCategory.length === 0 &&
      selectedBrand.length === 0 &&
      selectedRating.length === 0 &&
      selectedPriceRange[0] === 0 &&
      selectedPriceRange[1] === 1000 &&
      selectedColors.length === 0
    ) {
      if (sortingCriterion) {
        dispatch(
          getSortedProducts({ criterion: sortingCriterion, page: currentPage })
        );
      } else {
        dispatch(getGoods(currentPage));
      }
    } else {
      dispatch(
        getFilteredProducts({
          category: selectedCategory,
          brand: selectedBrand,
          rating: selectedRating,
          minPrice: selectedPriceRange[0],
          maxPrice: selectedPriceRange[1],
          color: selectedColors,
          page: currentPage,
        })
      );
    }
  }, [
    dispatch,
    currentPage,
    selectedCategory,
    selectedBrand,
    selectedRating,
    selectedPriceRange,
    selectedColors,
    sortingCriterion,
  ]);

  const toggleActive = () => {
    setToggleFilter(!toggleFilter);
  };

  const closeFilterBar = () => {
    setToggleFilter(false);
  };

  return (
    <div className={classes.catalog}>
      <div className={classes.container}>
        <h2 className={classes.filter_title}>All Product</h2>
        <div className={classes.product}>
          <Filter
            toggleActive={toggleActive}
            toggleFilter={toggleFilter}
            closeFilterBar={closeFilterBar}
            onCategoryChange={handleCategoryChange}
            onBrandChange={handleBrandChange}
            onRatingChange={handleRatingChange}
            onColorsChange={handleColorChange}
          />
          <div className={classes.product_catalog}>
            <div className={classes.sort}>
              <Sort onSortChange={handleSortChange} />
            </div>
            {loading ? (
              <Loader />
            ) : (
              <div className={classes.poducts}>
                {products.map((product) => {
                  return <ProductCart key={product.id} {...product} />;
                })}
              </div>
            )}
            <div className={classes.pagination}>
              {!loading && (
                <Pagination
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                  totalProductsCount={totalProductsCount}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
