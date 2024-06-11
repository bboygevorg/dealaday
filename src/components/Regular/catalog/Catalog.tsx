import React, { useEffect, useCallback } from "react";
import classes from "./catalog.module.scss";
import { useAppSelector, useAppDisptach } from "../../../redux/store/hook";
import { useSearchParams } from "react-router-dom";
import { toggleSideBar, closeSlideBar } from "../../../helper/globalFunction";
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
  ProductCart,
  Pagination,
  Loader,
  ProductEmpty,
} from "../../../helper/index";
import Filter from "../Filter/Filter";
import Sort from "./../../UI/Sort/Sort";

interface ToggleFilter {
  toggleMenu: boolean;
  setToggleMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const Catalog: React.FC<ToggleFilter> = ({ toggleMenu, setToggleMenu }) => {
  const [searchParams, setSearchParams] = useSearchParams();
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
  } = useAppSelector((state) => state.products);

  const dispatch = useAppDisptach();

  // const renderCount = useRef(0);
  // renderCount.current += 1;
  // console.log(`rendered ${renderCount.current} times`);

  const handleParametrChange = useCallback(
    (paramName: string, paramValue: any) => {
      switch (paramName) {
        case "page":
          dispatch(setCurrentPage({ page: paramValue }));
          window.scrollTo({ top: 0, behavior: "auto" });
          break;
        case "category":
          dispatch(setSelectedCategories(paramValue));
          break;
        case "brand":
          dispatch(setSelectedBrand(paramValue));
          break;
        case "rating":
          dispatch(setSelectedRating(paramValue));
          break;
        case "priceRange":
          dispatch(setSelectedPriceRange(paramValue));
          break;
        case "color":
          dispatch(setSelectedColors(paramValue));
          break;
        case "sort":
          dispatch(setSortingCriterion(paramValue));
          break;
        default:
          break;
      }

      const newCurrentPage = 1;
      if (totalProductsCount <= PAGE_LIMIT * (newCurrentPage - 1) + 1) {
        dispatch(setCurrentPage({ page: 1 }));
      }
    },
    [dispatch, searchParams, totalProductsCount]
  );

  const updateProducts = useCallback(() => {
    const [minPrice, maxPrice] = selectedPriceRange;

    dispatch(
      fetchProducts({
        category: selectedCategory,
        brand: selectedBrand,
        page: currentPage,
        rating: selectedRating,
        minPrice,
        maxPrice,
        color: selectedColor,
        criterion: sortingCriterion,
      }) as any
    );
  }, [
    dispatch,
    selectedCategory,
    selectedBrand,
    currentPage,
    selectedRating,
    selectedPriceRange,
    selectedColor,
    sortingCriterion,
  ]);

  useEffect(() => {
    updateProducts();
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

  return (
    <div className={classes.catalog}>
      <div className={classes.container}>
        <h2 className={classes.filter_title}>All Product</h2>
        <div className={classes.product}>
          <Filter
            toggleActive={() => toggleSideBar(toggleMenu, setToggleMenu)}
            toggleFilter={toggleMenu}
            closeFilterBar={() => closeSlideBar(setToggleMenu)}
            onCategoryChange={(category) =>
              handleParametrChange("category", category)
            }
            onBrandChange={(brand) => handleParametrChange("brand", brand)}
            onRatingChange={(rating) => handleParametrChange("rating", rating)}
            onPriceRange={(price) => handleParametrChange("price", price)}
            onColorsChange={(color) => handleParametrChange("color", color)}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            totalProductsCount={totalProductsCount}
            selectedRating={selectedRating}
            selectedBrand={selectedBrand}
            selectedCategory={selectedCategory}
          />
          <div className={classes.product_catalog}>
            <div className={classes.sort}>
              <Sort
                onSortChange={(criterion) =>
                  handleParametrChange("sort", criterion)
                }
              />
            </div>
            {loading === "pending" ? (
              <Loader width="100%" />
            ) : (
              <div className={classes.products}>
                {product && product.length > 0 ? (
                  product.map((product: any) => {
                    const { _id, title, img, rating, price, price_previous } =
                      product;

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
                  <div className={classes.deals}>
                    <ProductEmpty />
                  </div>
                )}
              </div>
            )}
            {loading === "succeeded" && (
              <div className={classes.pagination}>
                {product.length > 0 && (
                  <Pagination
                    currentPage={currentPage}
                    onPageChange={(newPagw) =>
                      handleParametrChange("page", newPagw)
                    }
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
