import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/authSlice';
import { useNavigate, Link } from 'react-router-dom';

function RegisterPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem('users') || '[]');

        if (users.find(u => u.email === email)) {
            alert('User already exists!');
            return;
        }

        const newUser = { email, password };
        const updatedUsers = [...users, newUser];
        localStorage.setItem('users', JSON.stringify(updatedUsers));

        const token = 'mocked-token-' + Date.now();
        localStorage.setItem('token', token);
        dispatch(loginSuccess({ token, user: { email } }));
        navigate('/dashboard');
    };

    return (
        <div style={{ maxWidth: '400px', margin: '100px auto' }}>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input type="email" value={email} required onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <input type="password" value={password} required onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <button type="submit">Register</button>
            </form>
            <p style={{ marginTop: '15px' }}>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
}

export default RegisterPage;
