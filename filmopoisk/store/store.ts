import { configureStore } from '@reduxjs/toolkit';
import { singleMovieApi } from '../reducers/singleMovieApi';
import authReducer from '../features/auth/auth'; 

export const makeStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      [singleMovieApi.reducerPath]: singleMovieApi.reducer,
      auth: authReducer,
    },
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(singleMovieApi.middleware),
  });
};

export type RootState = ReturnType<ReturnType<typeof makeStore>['getState']>;
export type AppDispatch = ReturnType<ReturnType<typeof makeStore>['dispatch']>;

import { useMemo } from 'react';

let store: ReturnType<typeof makeStore>;

export const initializeStore = (preloadedState = {}) => {
  let _store = store ?? makeStore(preloadedState);

  if (preloadedState && store) {
    _store = makeStore({
      ...store.getState(),
      ...preloadedState,
    });

    store = undefined;
  }

  if (typeof window === 'undefined') return _store;
  if (!store) store = _store;

  return _store;
};

export const useStore = (initialState: any) => {
  return useMemo(() => initializeStore(initialState), [initialState]);
};
