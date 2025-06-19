import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminLogin.css';

export default function AdminLogin() {
const navigate = useNavigate();
const [formData, setFormData] = useState({
    username: '',
    password: ''
});
const [error, setError] = useState('');

const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
};

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    const response = await axios.post('http://localhost:8081/api/admin/adminLogin', formData);

    if (response.data.success) {
        navigate('/AdminDashboard');
    } else {
        setError(response.data.message || 'Login failed');
    }
    } catch (err) {
    setError('Network error: ' + (err.response?.data?.message || err.message));
    }
};

return (
    <div className="admin-login-container">
    <div className="admin-login-card">
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label>Username</label>
            <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter username"
            required
            />
        </div>
        <div className="form-group">
            <label>Password</label>
            <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
            />
        </div>
        <button type="submit" className="login-btn">Login</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Link to="/" className="back-btn">← Back</Link>
    </div>
    </div>
);
}
