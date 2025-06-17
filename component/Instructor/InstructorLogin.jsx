import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './InstructorLogin.css';

export default function InstructorLogin() {
const [formData, setFormData] = useState({ email: '', password: '' });
const [error, setError] = useState('');
const navigate = useNavigate();

const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
};

const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  try {
    const response = await axios.post('http://localhost:8081/api/instructor/login', formData);
    localStorage.setItem('loggedInInstructor', JSON.stringify(response.data));

    navigate('/instructorDashboard');
  } catch (err) {
    if (err.response && err.response.data && err.response.data.message) {
      setError(err.response.data.message);
    } else {
      setError('Login failed. Please try again.');
    }
  }
};



return (
    <div className="login-container">
    <div className="login-box">
        <h2>Instructor Login</h2>
        <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
        />

        <label>Password</label>
        <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit">Login</button>

        <div className="login-options">
            <Link to="/instructorForgotPassword">Forgot Password?</Link>
            <Link to="/instructorRegister">Register</Link>
            <br />
            <Link to="/">← Back</Link>
        </div>
        </form>
    </div>
    </div>
);
}
