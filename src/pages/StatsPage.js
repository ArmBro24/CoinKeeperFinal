import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#FF8042', '#00C49F', '#FFBB28', '#A28EFF', '#FF6699'];

function StatsPage() {
    const transactions = useSelector((state) => state.transactions.transactions);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const filtered = transactions.filter((tx) => {
        if (!fromDate && !toDate) return true;
        const txDate = new Date(tx.date);
        const from = fromDate ? new Date(fromDate) : null;
        const to = toDate ? new Date(toDate) : null;
        return (!from || txDate >= from) && (!to || txDate <= to);
    });

    const groupByCategory = (type) => {
        const map = {};
        filtered.forEach((tx) => {
            if (tx.type === type) {
                map[tx.category] = (map[tx.category] || 0) + tx.amount;
            }
        });
        return Object.entries(map).map(([name, value]) => ({ name, value }));
    };

    const incomeData = groupByCategory('income');
    const expenseData = groupByCategory('expense');

    return (
        <div style={{ maxWidth: '900px', margin: '50px auto' }}>
            <h2>Statistics</h2>

            <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
                <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
            </div>

            <h3>Income by Category</h3>
            <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                    <Pie data={incomeData} dataKey="value" nameKey="name" outerRadius={100} label>
                        {incomeData.map((entry, index) => (
                            <Cell key={`cell-income-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>



            <h3 style={{ marginTop: '50px' }}>Expenses by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={expenseData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value">
                        {expenseData.map((entry, index) => (
                            <Cell key={`cell-exp-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default StatsPage;
