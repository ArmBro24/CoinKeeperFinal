import { createSlice, nanoid } from '@reduxjs/toolkit';

const stored = localStorage.getItem('transactions');
const initialState = {
    transactions: stored ? JSON.parse(stored) : [],
};

const transactionSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        addTransaction: {
            reducer(state, action) {
                state.transactions.push(action.payload);
                localStorage.setItem('transactions', JSON.stringify(state.transactions));
            },
            prepare(data) {
                return {
                    payload: {
                        id: nanoid(),
                        ...data,
                    },
                };
            },
        },
        deleteTransaction(state, action) {
            state.transactions = state.transactions.filter(t => t.id !== action.payload);
            localStorage.setItem('transactions', JSON.stringify(state.transactions));
        },
    },
});

export const { addTransaction, deleteTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;
