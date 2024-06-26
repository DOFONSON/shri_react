import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Movie } from '../../types/Movie';

export const moviesApi = createApi({
    reducerPath: 'moviesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3030/api/v1/' }),
    endpoints: (builder) => ({
        fetchMovies: builder.query<Movie[], void>({
            query: () => 'search',
            transformResponse: (response: { search_result: Movie[] }) => response.search_result,
        }),
    }),
});

type UseFetchMoviesQueryResult = ReturnType<typeof moviesApi.endpoints.fetchMovies.useQuery>;

export const { useFetchMoviesQuery }: { useFetchMoviesQuery: UseFetchMoviesQueryResult } = moviesApi;
