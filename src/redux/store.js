import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import transactionsReducer from './transactionSlice';
import categoryReducer from './categorySlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        transactions: transactionsReducer,
        categories: categoryReducer,
    },
});
