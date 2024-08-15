import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, signup } from './authAPI';

export const loginUser = createAsyncThunk('auth/login', async (credentials) => {
  const token = await login(credentials);
  localStorage.setItem('token', token); // Store the token in localStorage
  return token;
});

export const signupUser = createAsyncThunk('auth/signup', async (userData) => {
  const response = await signup(userData);
  return response;
});

const initialState = {
  token: localStorage.getItem('token') || null,
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.status = 'succeeded';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
