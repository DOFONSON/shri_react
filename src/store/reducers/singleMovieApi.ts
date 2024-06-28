import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const singleMovieApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3030/api/v1/' }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: 'login',
                method: 'POST',
                body: credentials,
            }),
        }),
        fetchSingleMovie: builder.query({
            query: (id) => ({
                url: `movie/${id}`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }),
        }),
        rateMovie: builder.mutation({
            query: ({ id, rating }) => ({
                url: `/rateMovie`,
                method: 'POST',
                body: { "movieId": id, "user_rate": rating },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }),
            async onQueryStarted({ id, rating }, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(
                        singleMovieApi.util.updateQueryData('fetchSingleMovie', id, (draft) => {
                            draft.userRating = rating;
                        })
                    );
                } catch {
                }
            },
        }),
    }),
});

export const { useLoginMutation, useFetchSingleMovieQuery, useRateMovieMutation } = singleMovieApi;
