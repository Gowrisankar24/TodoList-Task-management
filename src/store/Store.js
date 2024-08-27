import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../reducer/rootReducer';

export const Store = configureStore({
    reducer: rootReducer,
});
