import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts } from './productsAPI';

export const getProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { getState }) => {
    const token = getState().auth.token;
    const products = await fetchProducts(token);
    return products;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
