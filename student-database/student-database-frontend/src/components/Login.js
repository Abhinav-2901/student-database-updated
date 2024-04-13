import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      navigate('/landing');
    }
  }, [navigate]); // Empty dependency array ensures this effect runs only once on component mount

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleLogin();
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password,
      });
      if (response.status === 200) {
        sessionStorage.setItem('token', response.data.token);
        navigate('/landing');
      }
    } catch (error) {
      setErrorMessage('Invalid username or password');
    }
  };

  return (
    <div className="container-fluid" style={{ 
      background: 'linear-gradient(to right, #4a148c, #ff6f00)',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div className="card p-4" style={{ maxWidth: '400px', width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.8)', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <h2 className="card-title text-center mb-4">Existing User Login</h2>
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        <form>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          <div className="row justify-content-end">
            <button type="button" className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
        </form>
        <div className="mt-3 text-center">
          <p className="mb-0">New User? <Link to="/register">Register</Link></p>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
