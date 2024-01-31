const PAGE_LIMIT = 12;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (params, { rejectWithValue, dispatch }) => {
    const { url, successAction } = params;

    try {
      const res = await axios.get(url);
      dispatch(successAction(res.data));
      dispatch(setTotalProductsCount(Number(res.headers.get("x-total-count"))));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    isDealOne: [],
    filteredProductsTop: [],
    bannerProduct: {},
    currentPage: 1,
    totalProductsCount: 0,
    loading: false,
    selectedCategory: [],
    selectedBrand: [],
    selectedRating: [],
    selectedPriceRange: [0, 1000],
    selectedColors: [],
    sortingCriterion: null,
    selectedProduct: null,
  },
  reducers: {
    setGoods: (state, action) => {
      return {
        ...state,
        products: action.payload,
        isDealOne: action.payload
          .filter((product) => product.isDealOfTheDay === true)
          .slice(0, 3),
        filteredProductsTop: getFilteredProductsTop(action.payload),
        bannerProduct: action.payload
          .filter((product) => product.bannerProduct === true)
          .slice(0, 1),
      };
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload.page;
    },
    setTotalProductsCount: (state, action) => {
      state.totalProductsCount = action.payload;
    },
    setSelectedCategories: (state, action) => {
      state.selectedCategory = state.selectedCategory.includes(action.payload)
        ? state.selectedCategory.filter((c) => c !== action.payload)
        : [...state.selectedCategory, action.payload];
    },
    setSelectedBrand: (state, action) => {
      const brandIndex = state.selectedBrand.indexOf(action.payload);

      if (brandIndex !== -1) {
        state.selectedBrand.splice(brandIndex, 1);
      } else {
        state.selectedBrand.push(action.payload);
      }
    },

    setSelectedRating: (state, action) => {
      const ratingIndex = state.selectedRating.indexOf(action.payload);

      if (ratingIndex !== -1) {
        state.selectedRating.splice(ratingIndex, 1);
      } else {
        state.selectedRating.push(action.payload);
      }
    },

    setSelectedPriceRange: (state, action) => {
      state.selectedPriceRange = action.payload;
    },

    setSelectedColors: (state, action) => {
      const colorIndex = state.selectedColors.indexOf(action.payload);

      if (colorIndex !== -1) {
        state.selectedColors.splice(colorIndex, 1);
      } else {
        state.selectedColors.push(action.payload);
      }
    },

    setSortingCriterion: (state, action) => {
      state.sortingCriterion = action.payload;
    },
    setSortingOrder: (state, action) => {
      state.sortingOrder = action.payload;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchProducts.rejected, (state) => {
      state.loading = false;
    });
  },
});

const getFilteredProductsTop = (products) => {
  const below5Products = products.filter((product) => product.rating < 5);
  const rating5Products = products.filter((product) => product.rating === 5);
  return rating5Products.length >= 7
    ? rating5Products.slice(0, 7)
    : below5Products.length >= 7
    ? below5Products.slice(0, 7)
    : [];
};

export const {
  setGoods,
  setCurrentPage,
  setTotalProductsCount,
  setSelectedCategories,
  initializeSelectedCategories,
  setSelectedBrand,
  setSelectedRating,
  setSelectedPriceRange,
  setSelectedColors,
  setSortingCriterion,
  setSortingOrder,
  setSelectedProduct,
} = productSlice.actions;

export const getGoods = (page) =>
  fetchProducts({
    url: `http://localhost:3500/products?_page=${page}&_limit=${PAGE_LIMIT}`,
    successAction: setGoods,
  });

export const getProducts = ({
  criterion,
  order,
  page,
  category = [],
  brand = [],
  rating = [],
  minPrice,
  maxPrice,
  color = [],
}) => {
  const filters = [];

  if (category.length > 0)
    filters.push(`category[]=${category.join("&category[]=")}`);
  if (brand.length > 0) filters.push(`brand[]=${brand.join("&brand[]=")}`);
  if (rating.length > 0) filters.push(`rating[]=${rating.join("&rating[]=")}`);
  if (minPrice !== undefined && maxPrice !== undefined) {
    filters.push(`price_gte=${minPrice}`);
    filters.push(`price_lte=${maxPrice}`);
  }
  if (color.length > 0) filters.push(`color[]=${color.join("&color[]=")}`);

  let url = `http://localhost:3500/products?${filters.join(
    "&"
  )}&_page=${page}&_limit=${PAGE_LIMIT}`;

  if (criterion) {
    const sortOptions = {
      "Price Lowest First": { sort: "price", order: "asc" },
      "Price Highest First": { sort: "price", order: "desc" },
      "Product Name A-Z": { sort: "name", order: "asc" },
      "Product Name Z-A": { sort: "name", order: "desc" },
    };

    const { sort, order } = sortOptions[criterion] || {
      sort: criterion,
      order: order,
    };
    url += `&_sort=${sort}&_order=${order}`;
  }

  return fetchProducts({
    url,
    successAction: setGoods,
  });
};

export default productSlice.reducer;
