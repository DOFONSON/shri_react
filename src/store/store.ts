import { configureStore } from '@reduxjs/toolkit';
import { moviesApi } from './reducers/moviesApi';
import { singleMovieApi } from './reducers/singleMovieApi';
import authReducer from './slices/authSlice';

const store = configureStore({
    reducer: {
        [moviesApi.reducerPath]: moviesApi.reducer,
        [singleMovieApi.reducerPath]: singleMovieApi.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(moviesApi.middleware)
            .concat(singleMovieApi.middleware),
});

export default store;
