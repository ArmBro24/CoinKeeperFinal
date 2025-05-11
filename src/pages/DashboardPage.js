import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction } from '../redux/transactionSlice';
import { Link } from 'react-router-dom';

function DashboardPage() {
    const dispatch = useDispatch();
    const transactions = useSelector((state) => state.transactions.transactions);
    const categoryOptions = useSelector((state) => state.categories.categories);

    const [showForm, setShowForm] = useState(false);
    const [type, setType] = useState('income');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [comment, setComment] = useState('');

    useEffect(() => {
        if (transactions.length === 0) {
            dispatch(addTransaction({ type: 'income', amount: 1200, category: 'Salary', date: '2025-05-01', comment: 'Monthly salary' }));
            dispatch(addTransaction({ type: 'expense', amount: 300, category: 'Groceries', date: '2025-05-04', comment: 'Supermarket' }));
            dispatch(addTransaction({ type: 'expense', amount: 150, category: 'Transport', date: '2025-05-05', comment: 'Bus card' }));
        }
    }, [dispatch, transactions.length]);

    const balance = transactions.reduce((acc, tx) => {
        return tx.type === 'income' ? acc + tx.amount : acc - tx.amount;
    }, 0);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!amount || !category || !date) return;

        dispatch(addTransaction({
            type,
            amount: parseFloat(amount),
            category,
            date,
            comment
        }));

        setType('income');
        setAmount('');
        setCategory('');
        setDate('');
        setComment('');
        setShowForm(false);
    };

    return (
        <div style={{ maxWidth: '600px', margin: '50px auto' }}>
            <h2>Dashboard</h2>
            <h3>Current Balance: ${balance}</h3>

            <h4 style={{ marginTop: '30px' }}>Transactions:</h4>
            <ul>
                {transactions.map((tx) => (
                    <li key={tx.id} style={{ marginBottom: '10px' }}>
                        <strong>{tx.type === 'income' ? '+' : '-'}${tx.amount}</strong> — {tx.category} on {tx.date}<br />
                        <em>{tx.comment}</em>
                    </li>
                ))}
            </ul>

            {!showForm ? (
                <button style={{ marginTop: '30px', padding: '10px 20px' }} onClick={() => setShowForm(true)}>
                    + Add Transaction
                </button>
            ) : (
                <form onSubmit={handleSubmit} style={{ marginTop: '30px' }}>
                    <div style={{ marginBottom: '10px' }}>
                        <select value={type} onChange={(e) => setType(e.target.value)} required style={{ width: '100%', padding: '8px' }}>
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <input
                            type="number"
                            placeholder="Amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                            style={{ width: '100%', padding: '8px' }}
                        />
                    </div>
                    <div style={{
                        marginBottom: '10px',
                        display: 'flex',
                        gap: '10px',
                        alignItems: 'stretch'
                    }}>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                            style={{ flex: 1, padding: '8px' }}
                        >
                            <option value="" disabled>Select Category</option>
                            {categoryOptions
                                .filter(cat => cat.type === type)
                                .map((cat) => (
                                    <option key={cat.id} value={cat.name}>
                                        {cat.name}
                                    </option>
                                ))}
                        </select>
                        <Link
                            to="/settings"
                            style={{
                                fontSize: '13px',
                                color: '#007bff',
                                padding: '6px 12px',
                                border: '1px solid #007bff',
                                borderRadius: '4px',
                                height: '36px',
                                lineHeight: '1',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxSizing: 'border-box'
                            }}
                        >
                            Manage
                        </Link>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                            style={{ width: '100%', padding: '8px' }}
                        />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <input
                            type="text"
                            placeholder="Comment (optional)"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            style={{ width: '100%', padding: '8px' }}
                        />
                    </div>
                    <button type="submit" style={{ padding: '10px 20px', marginRight: '10px' }}>
                        Save
                    </button>
                    <button type="button" onClick={() => setShowForm(false)} style={{ padding: '10px 20px' }}>
                        Cancel
                    </button>
                </form>
            )}
        </div>
    );
}

export default DashboardPage;
