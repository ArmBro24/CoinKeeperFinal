import { createSlice, nanoid } from '@reduxjs/toolkit';

const getCurrentEmail = () => {
    const token = localStorage.getItem('token');
    if (!token || !token.startsWith('mocked-token-')) return 'guest';
    return token.replace('mocked-token-', '');
};



const loadTransactions = () => {
    const email = getCurrentEmail();
    return JSON.parse(localStorage.getItem(`transactions_${email}`) || '[]');
};

const saveTransactions = (transactions) => {
    const email = getCurrentEmail();
    localStorage.setItem(`transactions_${email}`, JSON.stringify(transactions));
};

const initialState = {
    transactions: loadTransactions(),
};

const transactionSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        addTransaction: {
            reducer(state, action) {
                state.transactions.push(action.payload);
                saveTransactions(state.transactions);
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
            saveTransactions(state.transactions);
        },
    },
});

export const { addTransaction, deleteTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;
