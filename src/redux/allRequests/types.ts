export interface Product {
  productId: {
    _id: string;
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
    icon_option: {
      id: number;
      icon: string;
      info: string;
      title: string;
    }[];
  };
}

export interface GetBanner {
  _id: string;
  name: string;
  description: string;
  backGroundImage: string;
}

export interface ProductSearch {
  _id: string;
  name: string;
  img: string;
  category: string;
  brand: string;
}

export interface allRequestsState {
  mostSlider: Product[];
  topSlider: Product[];
  dealsProducts: Product[];
  bannerProduct: Product[];
  products: ProductSearch[];
  getBanner: GetBanner[];
  error: string | null;
  loading: "pending" | "fulfilled" | "rejected";
}
