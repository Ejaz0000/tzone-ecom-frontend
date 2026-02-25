import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '@/utils/axiosInstance';

const initialState = {
  cart: null, // Full cart object from API
  loading: false,
  error: null,
};

// Thunk for fetching cart data
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/cart/');
      if (!response?.data?.status) {
        throw new Error('Invalid cart data');
      }
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Thunk for adding item to cart
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ variant_id, product_id, quantity }, { rejectWithValue }) => {
    try {
      // Validate that only one of variant_id or product_id is provided
      if (variant_id && product_id) {
        return rejectWithValue({
          message: 'Cannot provide both variant_id and product_id',
          data: {
            errors: {
              error: ['Cannot provide both variant_id and product_id']
            }
          }
        });
      }

      if (!variant_id && !product_id) {
        return rejectWithValue({
          message: 'Either variant_id or product_id is required',
          data: {
            errors: {
              error: ['Either variant_id or product_id is required']
            }
          }
        });
      }

      const payload = { quantity };
      if (variant_id) {
        payload.variant_id = variant_id;
      } else {
        payload.product_id = product_id;
      }

      const response = await axiosInstance.post('/cart/items/', payload);
      
      if (!response?.data?.status) {
        return rejectWithValue(response.data);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Thunk for updating cart item quantity
export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({ itemId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`/cart/items/${itemId}/`, {
        quantity,
      });
      if (!response?.data?.status) {
        return rejectWithValue(response.data);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Thunk for removing item from cart
export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (itemId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/cart/items/${itemId}/`);
      if (!response?.data?.status) {
        return rejectWithValue(response.data);
      }
      return { itemId, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Thunk for clearing cart
export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete('/cart/clear/');
      if (!response?.data?.status) {
        return rejectWithValue(response.data);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart(state, action) {
      state.cart = action.payload;
    },
    clearCartState(state) {
      state.cart = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Add to cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        // Refresh cart after adding item
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update cart item
      .addCase(updateCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Remove from cart
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Clear cart
      .addCase(clearCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = null;
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCart, clearCartState } = cartSlice.actions;
export default cartSlice.reducer;
