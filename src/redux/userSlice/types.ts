export interface Product {
  productId: {
    _id: string;
    img: string;
    title: string;
    rating: number;
    price: number;
    price_previous: number;
  };
}

export interface Review {
  edit: boolean;
  _id: string;
  productId: string;
  user: {
    _id: any;
    firstName: string;
    lastName: string;
  };
  rating: number;
  createdAt: string;
  updatedAt: number;
  comment: string;
}

export interface GetUser {
  default: string;
  _id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  firstName: string;
  password: string;
  lastName: string;
  phone: string;
  address: string[];
}

export interface UserData {
  user: {};
  wishlist: Product[];
  review: Review[];
  getUser: GetUser;
  status: string;
  error: string | null;
}
