import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type FilterState = {
    genres: string[];
    years: string[];
};

const initialState: FilterState = {
    genres: [],
    years: [],
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setGenres(state, action: PayloadAction<string[]>) {
            state.genres = action.payload;
        },
        setYears(state, action: PayloadAction<string[]>) {
            state.years = action.payload;
        },
    },
});

export const { setGenres, setYears } = filterSlice.actions;
export default filterSlice.reducer;
