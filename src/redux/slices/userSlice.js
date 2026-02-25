import { axiosInstance } from '@/utils/axiosInstance';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  user: null, // Store the entire user object
  loading: false,
  error: null,
};

// Thunk for fetching user data from get-auth API
export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/auth/profile');
      if (!response?.data?.status) {
        throw new Error('Invalid user data');
      }
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload; // Store the full user object
    },
    updateUserField(state, action) {
      const { field, value } = action.payload;
      if (state.user) {
        state.user[field] = value; // Update a specific field
      }
    },
    clearUser(state) {
      state.user = null; // Clear the user object
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setUser, updateUserField, clearUser } = userSlice.actions;
export default userSlice.reducer;
