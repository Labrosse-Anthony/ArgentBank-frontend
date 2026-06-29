import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.body.token;

        dispatch(loginSuccess(token));
        navigate('/profile');
      } else {
        setErrorMessage('Email ou mot de passe incorrect');
      }
    } catch (error) {
      setErrorMessage('Erreur lors de la connexion au serveur');
    }
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Email</label>
            <input 
              type="text" 
              id="username" 
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              autoComplete="username"
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              autoComplete="current-password"
              required
            />
          </div>
          {/* Affichage dynamique du message d'erreur */}
          {errorMessage && (
            <p style={{ color: '#ff4b4b', marginBottom: '1rem', fontWeight: 'bold' }}>
              {errorMessage}
            </p>
          )}
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button className="sign-in-button" type="submit">Sign In</button>
        </form>
      </section>
    </main>
  );
}

export default Login;