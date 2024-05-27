import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../helper/env";
import { ProductState } from "./types";

const initialState: ProductState = {
  product: [],
  loading: "idle",
  error: null,
  totalProductsCount: 0,
  currentPage: 1,
  selectedCategory: [],
  selectedBrand: [],
  selectedRating: [],
  selectedPriceRange: [0, 1000],
  selectedColor: [],
  sortingCriterion: null,
};

export const PAGE_LIMIT = 12;

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (
    {
      category,
      brand,
      page,
      rating,
      minPrice,
      maxPrice,
      color,
      criterion,
    }: {
      category: string[];
      brand: string[];
      page: number;
      rating: number[];
      minPrice: number;
      maxPrice: number;
      color: string[];
      criterion: string | null;
    },
    { rejectWithValue, dispatch }
  ) => {
    try {
      let url = `${apiUrl}/product/products?pageLimit=${PAGE_LIMIT}&currentPage=${page}`;

      const filters = [];

      if (category && category.length > 0) {
        const categoryFilters = Array.isArray(category)
          ? category.map((cat) => `category[]=${cat}`)
          : [];
        filters.push(...categoryFilters);
      }

      if (brand && brand.length > 0) {
        const brandFilters = Array.isArray(brand)
          ? brand.map((br) => `brand[]=${br}`)
          : [];
        filters.push(...brandFilters);
      }

      if (rating && rating.length > 0) {
        const ratingFilters = Array.isArray(rating)
          ? rating.map((rat) => `rating[]=${rat}`)
          : [];
        filters.push(...ratingFilters);
      }

      if (color && color.length > 0) {
        const colorFilters = color.map((col) => `color[]=${col}`);
        filters.push(...colorFilters);
      }

      if (minPrice !== undefined && maxPrice !== undefined) {
        const priceRange = [`minPrice=${minPrice}`, `maxPrice=${maxPrice}`];
        filters.push(...priceRange);
      }

      const sortOptionsPrice: { [key: string]: string } = {
        "Price Lowest First": "asc",
        "Price Highest First": "desc",
      };

      if (criterion && sortOptionsPrice[criterion]) {
        const sorParams = sortOptionsPrice[criterion];
        url += `&sortPrice=${sorParams}`;
      }

      const sortOptionsName: { [key: string]: string } = {
        "Product Name A-Z": "asc",
        "Product Name Z-A": "desc",
      };

      if (criterion && sortOptionsName[criterion]) {
        const sorParams = sortOptionsName[criterion];
        url += `&sortName=${sorParams}`;
      }

      const sortOptionsRating: { [key: string]: string } = {
        "Customer Rating": "desc",
      };

      if (criterion && sortOptionsRating[criterion]) {
        const sortParams = sortOptionsRating[criterion];
        url += `&sortRating=${sortParams}`;
      }

      if (filters.length > 0) {
        const filtersQueryString = filters.join("&");
        url += `&${filtersQueryString}`;
      }

      const response = await axios.get(url);
      const totalCounts = response.headers["x-total-count"];
      dispatch(setTotalProductsCount(Number(totalCounts) || 0));
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch products");
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.product = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload.page;
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
    setTotalProductsCount: (state, action) => {
      state.totalProductsCount = action.payload;
    },
    setSelectedColors: (state, action) => {
      const colorIndex = state.selectedColor.indexOf(action.payload);

      if (colorIndex !== -1) {
        state.selectedColor.splice(colorIndex, 1);
      } else {
        state.selectedColor.push(action.payload);
      }
    },
    setSortingCriterion: (state, action) => {
      state.sortingCriterion = action.payload;
    },
    resetProducts: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.product = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});

export const {
  setProducts,
  resetProducts,
  setSelectedCategories,
  setSelectedBrand,
  setSelectedRating,
  setSelectedPriceRange,
  setTotalProductsCount,
  setCurrentPage,
  setSelectedColors,
  setSortingCriterion,
} = productsSlice.actions;
export default productsSlice.reducer;
