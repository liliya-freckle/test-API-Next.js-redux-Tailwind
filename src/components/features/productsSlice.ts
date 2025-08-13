import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "./types";
import { fetchProductsAPI } from "./productsAPI";

interface ProductsState {
  items: Product[];
  loading: boolean;
  filter: "all" | "favorites";
  search: string;
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  filter: "all",
  search: "",
};

// Асинхронный thunk для загрузки продуктов
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    return await fetchProductsAPI();
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload);
    },
    toggleLike: (state, action: PayloadAction<number>) => {
      const product = state.items.find((p) => p.id === action.payload);
      if (product) product.liked = !product.liked;
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((p) => p.id !== action.payload);
    },
    setFilter: (state, action: PayloadAction<"all" | "favorites">) => {
      state.filter = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.map((p: Product) => ({
          ...p,
          liked: false,
        }));
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { addProduct, toggleLike, deleteProduct, setFilter, setSearch } =
  productsSlice.actions;

export default productsSlice.reducer;
