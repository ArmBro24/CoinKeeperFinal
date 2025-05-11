import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/authSlice';
import { useNavigate, Link } from 'react-router-dom';

function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const foundUser = users.find(u => u.email === email && u.password === password);

        if (!foundUser) {
            alert('Invalid email or password!');
            return;
        }

        const token = 'mocked-token-' + email;
        localStorage.setItem('token', token);
        dispatch(loginSuccess({ token, user: { email } }));
        navigate('/dashboard');
    };

    return (
        <div style={{ maxWidth: '400px', margin: '100px auto' }}>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input type="email" value={email} required onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <input type="password" value={password} required onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <button type="submit">Login</button>
            </form>
            <p style={{ marginTop: '15px' }}>
                Don't have an account? <Link to="/register">Register</Link>
            </p>
        </div>
    );
}

export default LoginPage;
