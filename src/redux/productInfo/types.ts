export type Icon = {
  icon: string;
  info: string;
  title: string;
};

export interface Product {
  _id: string;
  name: string;
  icon_option: Icon;
  title: string;
  rating: number;
  brand: string;
  sku: number;
  img: string;
  description: string;
  price: number;
  price_previous: number;
}

export interface ProductState {
  selectedProduct: Product | any;
  loading: string;
  error: string | null;
  productColor: [];
}
