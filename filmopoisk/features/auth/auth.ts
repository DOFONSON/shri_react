import { createSlice } from '@reduxjs/toolkit';
import { singleMovieApi } from '../../reducers/singleMovieApi'; // Adjust the path as necessary

const initialState = {
  token: typeof window !== 'undefined' ? localStorage.getItem('token') || null : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(singleMovieApi.endpoints.login.matchFulfilled, (state, action) => {
      state.token = action.payload.token;
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', action.payload.token);
      }
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
