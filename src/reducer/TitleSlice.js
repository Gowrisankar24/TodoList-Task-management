import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    textVal: '',
    descVal: '',
    statusVal: '',
};
export const TitleSlice = createSlice({
    name: 'TitleSlice',
    initialState,
    reducers: {
        titleTextAction: (state, action) => {
            return { ...state, textVal: action.payload };
        },
        descTextAction: (state, action) => {
            return { ...state, descVal: action.payload };
        },
        statusAction: (state, action) => {
            return { ...state, statusVal: action.payload };
        },
    },
});

export const { titleTextAction, descTextAction, statusAction } = TitleSlice.actions;
export default TitleSlice.reducer;
