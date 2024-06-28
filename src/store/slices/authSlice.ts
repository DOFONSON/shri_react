import { createSlice } from '@reduxjs/toolkit';
import { singleMovieApi } from '../reducers/singleMovieApi';

const initialState = {
    token: localStorage.getItem('token') || null,
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
        builder.addMatcher(singleMovieApi.endpoints.login.matchFulfilled, (state, action) => {
            state.token = action.payload.token;
            localStorage.setItem('token', action.payload.token);
        });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
