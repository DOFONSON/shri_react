import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Movie } from '../../types/Movie';

export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3030/api/v1/' }),
  endpoints: (builder) => ({
    fetchMovies: builder.query<Movie[], { page: string; genre?: string; year?: string; search?: string }>({
      query: ({ page, genre, year, search }) => {
        let queryString = `/search?page=${page}`;
        if (genre) queryString += `&genre=${genre}`;
        if (year) queryString += `&release_year=${year}`;
        if (search) queryString += `&title=${search}`;
        return queryString;
      },
      transformResponse: (response: { search_result: Movie[] }) => response.search_result,
    }),
  }),
});

export const { useFetchMoviesQuery } = moviesApi;
