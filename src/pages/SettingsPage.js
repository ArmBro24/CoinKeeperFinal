import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, deleteCategory } from '../redux/categorySlice';

function SettingsPage() {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories.categories);

    const [name, setName] = useState('');
    const [type, setType] = useState('income');

    const handleAddCategory = (e) => {
        e.preventDefault();
        if (!name.trim()) return;
        dispatch(addCategory(name, type));
        setName('');
        setType('income');
    };

    return (
        <div style={{ maxWidth: '500px', margin: '50px auto' }}>
            <h2>Manage Categories</h2>

            <form onSubmit={handleAddCategory} style={{ marginTop: '20px' }}>
                <input
                    type="text"
                    placeholder="Category Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                />
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
                <button type="submit" style={{ padding: '8px 16px' }}>Add Category</button>
            </form>

            <h4 style={{ marginTop: '30px' }}>Your Categories:</h4>
            <ul>
                {categories.map((cat) => (
                    <li key={cat.id} style={{ marginBottom: '10px' }}>
                        <strong>{cat.name}</strong> ({cat.type}){' '}
                        <button onClick={() => dispatch(deleteCategory(cat.id))} style={{ marginLeft: '10px' }}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SettingsPage;
