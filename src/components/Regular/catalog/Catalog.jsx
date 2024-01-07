import React, { useState, useEffect } from "react";
import classes from "./catalog.module.scss";
import { useDispatch, useSelector } from "react-redux";

import {
  getGoods,
  getProducts,
  setCurrentPage,
  setSelectedCategories,
  setSelectedBrand,
  setSelectedRating,
  setSelectedColors,
  setSortingCriterion,
} from "../../../redux/initialGoods/initialGoods";

import {
  Filter,
  Sort,
  ProductCart,
  Pagination,
  Loader,
  DealsInformation,
} from "../../../helper/index";

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

  const updateProducts = (newCurrentPage) => {
    dispatch(getGoods(newCurrentPage));
    dispatch(setCurrentPage({ page: newCurrentPage }));
  };

  const handlePageChange = (newPage) => {
    dispatch(setCurrentPage({ page: newPage }));
    dispatch(getGoods(newPage));
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const handleCategoryChange = (category, newPage) => {
    dispatch(setSelectedCategories(category));

    const updatedSelecetedCategory = [...selectedCategory];
    const newCurrentPage = newPage || 1;

    if (updatedSelecetedCategory.length === 0) {
      updateProducts(newCurrentPage);
    } else {
      dispatch(
        getProducts({
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
  };

  const handleBrandChange = (brand) => {
    dispatch(setSelectedBrand(brand));

    const updatedSelecetedBrand = [...selectedBrand];
    const newCurrentPage = 1;

    if (updatedSelecetedBrand.length === 0) {
      updateProducts(newCurrentPage);
    } else {
      dispatch(
        getProducts({
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
  };

  const handleRatingChange = (rating) => {
    dispatch(setSelectedRating(rating));

    const updatedSelecetedRating = [...selectedRating];
    const newCurrentPage = 1;

    if (updatedSelecetedRating.length === 0) {
      updateProducts(newCurrentPage);
    } else {
      getProducts({
        category: selectedCategory,
        brand: selectedBrand,
        rating: updatedSelecetedRating,
        minPrice: selectedPriceRange[0],
        maxPrice: selectedPriceRange[1],
        color: selectedColors,
        page: newCurrentPage,
      });
    }
  };

  const handleColorChange = (color, newPage) => {
    dispatch(setSelectedColors(color));
    const updatedSelecetedColors = [...selectedColors];
    const newCurrentPage = newPage || 1;

    if (updatedSelecetedColors.length === 0) {
      updateProducts(newCurrentPage);
    } else {
      dispatch(
        getProducts({
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
  };

  const handleSortChange = (criterion, newPage) => {
    const currentSortingCriterion = sortingCriterion;
    const selectedPage = newPage || currentPage;

    dispatch(setSortingCriterion(criterion));
    dispatch(setCurrentPage({ page: selectedPage }));

    dispatch(
      getProducts({
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
          getProducts({
            criterion: sortingCriterion,
            page: currentPage,
          })
        );
      } else {
        dispatch(getGoods(currentPage));
      }
    } else {
      dispatch(
        getProducts({
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
              <Loader width="100%" />
            ) : (
              <div className={classes.poducts}>
                {products && products.length > 0 ? (
                  products.map((product) => {
                    return <ProductCart key={product.id} {...product} />;
                  })
                ) : (
                  <>
                    <div className={classes.deals}>
                      <DealsInformation />
                    </div>
                  </>
                )}
              </div>
            )}
            <div className={classes.pagination}>
              {!loading && products && products.length > 0 && (
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
