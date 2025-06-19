import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './StudentLogin.css';

export default function StudentLogin() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post('http://localhost:8081/api/student/login', formData);

    if (response.status === 200 && response.data.email) {
      localStorage.setItem("loggedInStudent", JSON.stringify(response.data));
      localStorage.setItem("email", response.data.email);
      navigate('/studentDashboard');
    } else {
      setError("Login failed: Invalid credentials");
    }
  } catch (err) {
    if (err.response && err.response.status === 401) {
      setError("Invalid email or password");
    } else {
      setError('Network error: ' + (err.message || 'Unknown error'));
    }
  }
};




    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Student Login</h2>
                <form onSubmit={handleLogin}>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                    />

                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                    />

                    <button type="submit">Login</button>

                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    <div className="login-options">
                        <Link to="/StudentForgotPassword">Forgot Password?</Link>
                        <Link to="/StudentRegister">Register</Link>
                        <br />
                        <Link to="/">← Back</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
