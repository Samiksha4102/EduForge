import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function InstructorRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    experience: '',
    courseName: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    const payload = {
      username: formData.username,
      email: formData.email,
      experience: formData.experience,
      courseName: formData.courseName,
      password: formData.password
    };

    try {
      const response = await fetch('http://localhost:8081/api/instructor/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert('Registration successful!');
        navigate('/instructorLogin');
      } else {
        const data = await response.json();
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Instructor Registration</h2>
        <form onSubmit={handleSubmit}>
          <label>Full Name:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />

          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />

          <label>Experience:</label>
          <input type="text" name="experience" value={formData.experience} onChange={handleChange} required />

          <label>Course Name:</label>
          <input type="text" name="courseName" value={formData.courseName} onChange={handleChange} required />

          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />

          <label>Confirm Password:</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />

          <button type="submit">Register</button>

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <div className="login-options">
            <Link to="/instructorLogin">Already have an account? Login</Link>
            <br />
            <Link to="/">← Back</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
