import React, { useState, useEffect, useCallback } from "react";
import classes from "./catalog.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store/store";

import {
  fetchProducts,
  setSelectedCategories,
  setSelectedBrand,
  setCurrentPage,
  PAGE_LIMIT,
  setSelectedRating,
  setSelectedPriceRange,
  setSelectedColors,
  setSortingCriterion,
} from "../../../redux/products/products";

import {
  Filter,
  Sort,
  ProductCart,
  Pagination,
  Loader,
  ProductEmpty,
} from "../../../helper/index";

const Catalog: React.FC = () => {
  const [toggleFilter, setToggleFilter] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (toggleFilter && window.scrollY >= 350) {
        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";
      } else {
        document.documentElement.style.overflow = "visible";
        document.body.style.overflow = "visible";
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [toggleFilter]);

  const {
    product,
    loading,
    selectedCategory,
    selectedBrand,
    totalProductsCount,
    selectedPriceRange,
    currentPage,
    selectedRating,
    selectedColor,
    sortingCriterion,
  } = useSelector((state: RootState) => state.products);

  const dispatch = useDispatch();

  const updateProducts = useCallback(
    (
      category: string[],
      brand: string[],
      newPage: number,
      rating: number[],
      minPrice: number,
      maxPrice: number,
      color: string[],
      criterion: string | null
    ) => {
      dispatch(
        fetchProducts({
          category,
          brand,
          page: newPage,
          rating,
          minPrice,
          maxPrice,
          color,
          criterion,
        }) as any
      );
    },
    [dispatch, fetchProducts]
  );

  const handlePageChange = useCallback((newPage: number) => {
    dispatch(setCurrentPage({ page: newPage }));
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const handleCategoryChange = useCallback(
    (category: string) => {
      dispatch(setSelectedCategories(category));

      const newCurrentPage = 1;

      if (totalProductsCount <= PAGE_LIMIT * (newCurrentPage - 1) + 1) {
        dispatch(setCurrentPage({ page: 1 }));
      }
    },

    [dispatch]
  );

  const handleBrandChange = useCallback(
    (brand: string) => {
      dispatch(setSelectedBrand(brand));

      const newCurrentPage = 1;

      if (totalProductsCount < PAGE_LIMIT * (newCurrentPage - 1) + 1) {
        dispatch(setCurrentPage({ page: 1 }));
      }
    },
    [dispatch]
  );

  const handleRatingChange = useCallback(
    (rating: number) => {
      dispatch(setSelectedRating(rating));

      const newCurrentPage = 1;

      if (totalProductsCount < PAGE_LIMIT * (newCurrentPage - 1) + 1) {
        dispatch(setCurrentPage({ page: 1 }));
      }
    },
    [dispatch]
  );

  const handlePriceRange = useCallback(
    (minPrice: number[], maxPrice: number[]) => {
      dispatch(setSelectedPriceRange({ minPrice, maxPrice }));
    },
    [dispatch]
  );

  const handleColorChange = useCallback(
    (color: string) => {
      dispatch(setSelectedColors(color));
      console.log(color);

      const newCurrentPage = 1;

      if (totalProductsCount < PAGE_LIMIT * (newCurrentPage - 1) + 1) {
        dispatch(setCurrentPage({ page: 1 }));
      }
    },

    [dispatch]
  );

  const handleSortChange = useCallback(
    (criterion: string | null) => {
      dispatch(setSortingCriterion(criterion));
    },
    [dispatch]
  );

  useEffect(() => {
    const [minPrice, maxPrice] = selectedPriceRange;
    updateProducts(
      selectedCategory,
      selectedBrand,
      currentPage,
      selectedRating,
      minPrice,
      maxPrice,
      selectedColor,
      sortingCriterion
    );
  }, [
    updateProducts,
    selectedCategory,
    selectedBrand,
    currentPage,
    selectedRating,
    selectedPriceRange,
    selectedColor,
    sortingCriterion,
  ]);

  const toggleActive = () => {
    setToggleFilter(!toggleFilter);

    window.scrollTo({ top: 0, behavior: "auto" });
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
            onPriceRange={handlePriceRange}
            onColorsChange={handleColorChange}
          />
          <div className={classes.product_catalog}>
            <div className={classes.sort}>
              <Sort onSortChange={handleSortChange} />
            </div>

            {loading === "pending" ? (
              <Loader width="100%" />
            ) : (
              <div className={classes.poducts}>
                {product && product.length > 0 ? (
                  product.map((product: any) => {
                    const {
                      _id,
                      name,
                      title,
                      img,
                      rating,
                      price,
                      price_previous,
                    } = product;
                    return (
                      <ProductCart
                        key={product._id}
                        id={_id}
                        img={img}
                        rating={rating}
                        title={title}
                        price={price}
                        price_previous={price_previous}
                      />
                    );
                  })
                ) : (
                  <>
                    <div className={classes.deals}>
                      <ProductEmpty />
                    </div>
                  </>
                )}
              </div>
            )}
            {loading === "succeeded" && (
              <div className={classes.pagination}>
                {product.length > 0 && (
                  <Pagination
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                    totalProductsCount={totalProductsCount}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
