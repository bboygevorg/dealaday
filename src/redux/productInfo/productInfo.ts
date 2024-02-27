import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface ProductState {
  selectedProduct: any | null;
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
  productColor: [];
}

const initialState: ProductState = {
  selectedProduct: null,
  loading: "idle",
  error: null,
  productColor: [],
};

export const getProductInfo = createAsyncThunk(
  "products/getProductInfo",
  async (id: any, { rejectWithValue, dispatch }) => {
    try {
      let url = `http://localhost:5000/products/${id}`;
      const response = await axios.get(url);
      const productName = response.data.name;

      const productsWithSameNameRes = await axios.get(
        `http://localhost:5000/products?name=${productName}`
      );
      const productsWithSameName = productsWithSameNameRes.data;
      dispatch(setProductColor(productsWithSameName));
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to get product");
    }
  }
);

// export const getGoodsId = (id) => {
//   return async (dispatch) => {
//     try {
//       const res = await axios.get(`http://localhost:3500/products/${id}`);
//       dispatch(setSelectedProduct(res.data));

//       const productName = res.data.name;
//       const productIcon = res.data;

//       const productsWithSameNameRes = await axios.get(
//         `http://localhost:3500/products?name=${productName}`
//       );
//       const productsWithSameName = productsWithSameNameRes.data;
//       const iconOption = productIcon.icon_option || [];
//       dispatch(setProductColor(productsWithSameName));
//       dispatch(setIconOption(iconOption));
//     } catch (error) {
//       console.error("Error fetching product:", error);
//     }
//   };
// };

const productInfoSlice = createSlice({
  name: "productInfo",
  initialState,
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setProductColor: (state, action) => {
      state.productColor = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductInfo.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getProductInfo.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.selectedProduct = action.payload;
      })
      .addCase(getProductInfo.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});

export const { setSelectedProduct, setProductColor } = productInfoSlice.actions;

export default productInfoSlice.reducer;

// const fetchProducts = createAsyncThunk(
//   "products/fetchProducts",
//   async (params, { rejectWithValue, dispatch }) => {
//     const { url, successAction } = params;

//     try {
//       const response = await axios.get(url);
//       const serializableData = {
//         data: response.data,
//         status: response.status,
//         // other serializable fields as needed
//       };
//       dispatch(successAction(serializableData));
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// const productInfoSlice = createSlice({
//   name: "products",
//   initialState,
//   reducers: {
//     setSelectedProduct: (state, action) => {
//       state.selectedProduct = action.payload;
//     },
//     setProductColor: (state, action) => {
//       state.productColor = [...action.payload];
//     },
//     setIconOption: (state, action) => {
//       state.iconOption = [...action.payload];
//     },
//     clearProductInfo: (state) => {
//       state.selectedProduct = null;
//       state.productColor = [];
//       state.loading = false;
//       state.error = null;
//     },
//   },

//   extraReducers: {
//     [fetchProducts.fulfilled]: (state) => {
//       state.loading = false;
//     },
//     [fetchProducts.pending]: (state) => {
//       state.loading = true;
//     },
//     [fetchProducts.rejected]: (state) => {
//       state.loading = false;
//     },
//   },
// });

// export const { setSelectedProduct, setProductColor, setIconOption } =
//   productInfoSlice.actions;

// export const getGoodsId = (id) => {
//   return async (dispatch) => {
//     try {
//       const res = await axios.get(`http://localhost:3500/products/${id}`);
//       dispatch(setSelectedProduct(res.data));

//       const productName = res.data.name;
//       const productIcon = res.data;

//       const productsWithSameNameRes = await axios.get(
//         `http://localhost:3500/products?name=${productName}`
//       );
//       const productsWithSameName = productsWithSameNameRes.data;
//       const iconOption = productIcon.icon_option || [];
//       dispatch(setProductColor(productsWithSameName));
//       dispatch(setIconOption(iconOption));
//     } catch (error) {
//       console.error("Error fetching product:", error);
//     }
//   };
// };

// export default productInfoSlice.reducer;
