import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/authSlice';
import { useNavigate, Link } from 'react-router-dom';

function RegisterPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // имитация регистрации + автоматический логин
    const handleRegister = (e) => {
        e.preventDefault();

        // можно позже заменить на axios.post('/api/register', {...})
        const mockToken = 'mocked-jwt-token';
        const mockUser = { email };

        dispatch(loginSuccess({ token: mockToken, user: mockUser }));
        navigate('/dashboard');
    };

    return (
        <div style={{ maxWidth: '400px', margin: '100px auto' }}>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
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
                    Зарегистрироваться
                </button>
            </form>

            <p style={{ marginTop: '15px' }}>
                Already have an account?{' '}
                <Link to="/login" style={{ color: 'blue' }}>
                    Login
                </Link>
            </p>
        </div>
    );
}

export default RegisterPage;
