export interface ProductState {
  product: Product[];
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
  selectedCategory: string[];
  selectedBrand: string[];
  selectedRating: number[];
  selectedPriceRange: number[];
  selectedColor: string[];
  totalProductsCount: number;
  currentPage: number;
  sortingCriterion: null | string;
}

export interface Product {
  name: string;
  title: string;
  img: string;
  category: string;
  brand: string;
  color: string;
  description: string;
  price: number;
  price_previous: number;
  rating: number;
  sku: number;
  icon_option: [
    {
      id: number;
      icon: string;
      info: string;
      title: string;
    }
  ];
}

export const initialState: ProductState = {
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
