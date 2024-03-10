import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

interface CartItem {
  productToAdd: any;
  selectedOption: number;
  subtotal: number;
}

interface CartState {
  cartItems: CartItem[];
}

function loadCartFromLocalStorage(): CartItem[] {
  const storedCartItems = localStorage.getItem("cartItems");
  return storedCartItems ? JSON.parse(storedCartItems) : [];
}

const initialState: CartState = {
  cartItems: loadCartFromLocalStorage(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const newProduct = action.payload;

      const existingProductIndex = state.cartItems.findIndex(
        (item) => item.productToAdd._id === newProduct.productToAdd._id
      );

      if (existingProductIndex !== -1) {
        const existingProduct = state.cartItems[existingProductIndex];
        if (existingProduct !== undefined) {
          // Update existing product
          existingProduct.selectedOption = newProduct.selectedOption;
          existingProduct.subtotal = newProduct.subtotal;
          toast.error("You have already added the product", {
            autoClose: 2000,
            theme: "colored",
          });
        } else {
          // Display error if existing product is somehow undefined
          toast.info("Product changed", {
            autoClose: 2000,
            theme: "colored",
          });
        }
      } else {
        // Add new product to the cart
        state.cartItems.push(newProduct);
        toast.success("Product added", {
          autoClose: 2000,
          theme: "colored",
        });
      }

      saveCartToLocalStorage(state.cartItems);
    },
    removeToCart(state, action: PayloadAction<string>) {
      // Action payload should be productId
      const productId = action.payload;
      // Filter out the product with the provided productId
      state.cartItems = state.cartItems.filter(
        (item) => item.productToAdd._id !== productId
      );

      localStorage.removeItem("cartItems");
    },
  },
});

function saveCartToLocalStorage(cartItems: CartItem[]): void {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

export const { addToCart, removeToCart } = cartSlice.actions;

export default cartSlice.reducer;
