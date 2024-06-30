import { configureStore } from '@reduxjs/toolkit';
import { moviesApi } from './reducers/moviesApi';
import { singleMovieApi } from './reducers/singleMovieApi';
import authReducer from './slices/authSlice';
import filterReducer from './reducers/filterReducer';

const store = configureStore({
    reducer: {
        [moviesApi.reducerPath]: moviesApi.reducer,
        [singleMovieApi.reducerPath]: singleMovieApi.reducer,
        auth: authReducer,
        filter: filterReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(moviesApi.middleware)
            .concat(singleMovieApi.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
