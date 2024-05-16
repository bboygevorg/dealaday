import React, { useEffect, useCallback, useRef } from "react";
import classes from "./catalog.module.scss";
import { useAppSelector, useAppDisptach } from "../../../redux/store/hook";

import { useSearchParams } from "react-router-dom";

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

interface ToggleFilter {
  toggleFilter: boolean;
  setToggleFilter: any;
}

const Catalog: React.FC<ToggleFilter> = ({ toggleFilter, setToggleFilter }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {}, [window.scrollY]);

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

  const renderCount = useRef(0);
  renderCount.current += 1;
  console.log(`rendered ${renderCount.current} times`);

  const handleParametrChange = useCallback(
    (paramName: string, paramValue: any) => {
      let updatedValue: string | null;
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
    [dispatch, searchParams, totalProductsCount]
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
          {product.length > 0 ? (
            <Filter
              toggleActive={toggleActive}
              toggleFilter={toggleFilter}
              closeFilterBar={closeFilterBar}
              onCategoryChange={(category) =>
                handleParametrChange("category", category)
              }
              onBrandChange={(brand) => handleParametrChange("brand", brand)}
              onRatingChange={(rating) =>
                handleParametrChange("rating", rating)
              }
              onPriceRange={(price) => handleParametrChange("price", price)}
              onColorsChange={(color) => handleParametrChange("color", color)}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />
          ) : (
            ""
          )}

          <div className={classes.product_catalog}>
            {product.length !== 0 && (
              <div className={classes.sort}>
                <Sort
                  onSortChange={(criterion) =>
                    handleParametrChange("sort", criterion)
                  }
                />
              </div>
            )}

            {loading === "pending" ? (
              <Loader width="100%" />
            ) : (
              <div className={classes.poducts}>
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
