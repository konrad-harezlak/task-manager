import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import axios from '../api.js';
import './login.css'

const Login = () => {
    const { login } = useAuth();
    const [loginData, setLoginData] = useState({
        userName: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/login', loginData);
            const user = response.data.user.rows[0];
            login(user);
            navigate('/home');
        } catch (error) {
            console.error('Błąd logowania:', error);
            if (error.response && error.response.status === 401) {
                setErrorMessage('Zły Login lub Hasło.');
            } else {
                console.error('Błąd logowania:', error);
            }
        }
    };

    return (
        <div className='login_page'>
            <div className='form'>
                <form method="POST" onSubmit={handleLogin}>
                    <label>
                        <p> Wpisz swój login: </p>
                        <input
                            type='userName'
                            placeholder='Login...'
                            name='userName'
                            value={loginData.userName}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        <p> Hasło: </p>
                        <input
                            type='password'
                            placeholder='Haslo...'
                            name='password'
                            value={loginData.password}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br />
                    <button type='submit' className='button_login'>Submit!</button>
                </form>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <p className='p_link'><Link to="/registration" className='link'>Zarejestruj się!</Link></p>
            </div>
        </div>
    )
}
export default Login;