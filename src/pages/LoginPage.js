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

        // мок-логика логина (в реальности заменится на API)
        const mockToken = 'mocked-jwt-token';
        const mockUser = { email };

        dispatch(loginSuccess({ token: mockToken, user: mockUser }));
        navigate('/dashboard');
    };

    return (
        <div style={{ maxWidth: '400px', margin: '100px auto' }}>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div style={{ marginBottom: '10px' }}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <button type="submit" style={{ width: '100%', padding: '8px' }}>
                    Войти
                </button>
            </form>

            <p style={{ marginTop: '15px' }}>
                Don't have an account?{' '}
                <Link to="/register" style={{ color: 'blue' }}>
                    Register
                </Link>
            </p>
        </div>
    );
}

export default LoginPage;
