import { createSlice, nanoid } from '@reduxjs/toolkit';

const stored = localStorage.getItem('categories');
const initialState = {
    categories: stored ? JSON.parse(stored) : [
        { id: 'default-income', name: 'Salary', type: 'income' },
        { id: 'default-expense', name: 'Groceries', type: 'expense' },
    ],
};


const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        addCategory: {
            reducer(state, action) {
                state.categories.push(action.payload);
                localStorage.setItem('categories', JSON.stringify(state.categories));
            },
            prepare(name, type) {
                return {
                    payload: {
                        id: nanoid(),
                        name,
                        type, // 'income' or 'expense'
                    },
                };
            },
        },
        deleteCategory(state, action) {
            state.categories = state.categories.filter((cat) => cat.id !== action.payload);
            localStorage.setItem('categories', JSON.stringify(state.categories));
        },
    },
});

export const { addCategory, deleteCategory } = categorySlice.actions;
export default categorySlice.reducer;
