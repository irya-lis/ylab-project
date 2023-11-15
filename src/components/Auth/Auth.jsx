import React, {useState} from 'react';
import {authenticateMock} from "../utils/authMock";
import styles from "./Auth.module.css";

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const isValidEmail = (email) => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegex.test(email);
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        setError(null);

        if (!email.trim() && !password.trim()) {
            setError('Заполните обязательные поля Email и Password.');
            return;
        }

        if (!email.trim()) {
            setError('Пожалуйста, введите свой email.');
            return;
        }

        if (!password.trim()) {
            setError('Пожалуйста, введите свой пароль.');
            return;
        }

        if (!isValidEmail(email)) {
            setError('Пожалуйста, введите корректный email.');
            return;
        }

        try {
            setIsLoading(true);
            const response = await authenticateMock(email, password);
            // Если вход успешен, то перенаправляю пользователя
            window.location.href = 'https://ylab.io/';
        } catch (error) {
            if (error.type === 'invalid_email' || error.type === 'invalid_password') {
                setError('Введен неверный email или пароль');
            } else {
                setError('Ошибка входа. Пожалуйста, проверьте ваши учетные данные.');
            }
        } finally {
            setIsLoading(false);
        }
    };


    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setError(null);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setError(null);
    };

    return (
        <>
            <div className={styles.img}><img src={"logo.jpg"} alt="logo"/></div>
            <h2 className={styles.title}>Login to Your Account</h2>
            <div className={styles.login_container}>

                <form onSubmit={handleLogin} noValidate>
                    <label>Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleEmailChange}
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />

                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Sending in...' : 'Sign in'}
                    </button>
                </form>

                {error && <p style={{color: 'red'}}>{error}</p>}
            </div>
        </>
    );
};

export default Auth;
