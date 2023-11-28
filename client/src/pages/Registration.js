import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import './registration.css'

const Registration = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        userName: '',
        email: '',
        password: '',
        password2: ''
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };
    const handleSubmit = async (e) => {
        let alert = document.getElementById('alert');
        alert.innerHTML = '';
        e.preventDefault();
        if (userData.password !== userData.password2) {
            alert.innerHTML += 'Hasła nie są takie same!';
            return;
        } else
            alert.innerHTML = '';
        try {
           
            return navigate("/");
        } catch (error) {
            console.error(error, '\n', error.response);
            if (error.response && error.response.status === 400) {
                if (error.response.data.message === 'Użytkownik o podanej nazwie już istnieje.') {
                    alert.innerHTML += 'Użytkownik o podanej nazwie już istnieje.';
                } else if (error.response.data.message === 'Użytkownik o podanym emailu już istnieje.') {
                    alert.innerHTML += 'Użytkownik o podanym adresie e-mail już istnieje.';
                } else {
                    alert.innerHTML += 'Wystąpił błąd podczas rejestracji.';
                }
            }
        }

    }
    return (
        <div className='registration_page'>
            <div className='form'>
                <form method='POST' onSubmit={handleSubmit}>
                    <label>
                        <p> Podaj Login: </p>
                        <input type='text' placeholder='Login...' onChange={handleInputChange} name='userName' value={userData.userName} />
                    </label>
                    <label>
                        <p> Podaj Email: </p>
                        <input type='email' placeholder='Email...' onChange={handleInputChange} name='email' value={userData.email} />
                    </label>
                    <label>
                        <p> Hasło: </p>
                        <input type='password' placeholder='Hasło...' onChange={handleInputChange} name='password' value={userData.password} />
                    </label>
                    <label>
                        <p> Powtórz Hasło: </p>
                        <input type='password' placeholder='Powtórz hasło...' onChange={handleInputChange} name='password2' value={userData.password2} />
                    </label>
                    <p id='alert' className='alert_wrong' ></p>
                    <br />
                    <button type='submit' className='button_login'>Submit!</button>
                </form>
                <p className='p_link'><Link to="/" className='link'>Zaloguj się!</Link></p>
            </div>
        </div>
    )
}
export default Registration;