import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function StudentRegister() {
const navigate = useNavigate();

const [formData, setFormData] = useState({
    student_name: '',
    email: '',
    dob: '',
    gender: '',
    course: '',
    password: '',
    confirmPassword: ''
});
const [error, setError] = useState('');

const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
    console.log("Form Data Updated:", {...formData, [e.target.name]: e.target.value});
};

const handleSubmit = async (e) => {
  e.preventDefault();

  const nameRegex = /^([A-Za-z]+(?:\s[A-Za-z]+){1,2})$/; // 2 or 3 words
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!nameRegex.test(formData.student_name)) {
    setError("Name must be 2 or 3 words, only letters and spaces.");
    return;
  }

  if (!emailRegex.test(formData.email)) {
    setError("Enter a valid email address.");
    return;
  }

  if (!passwordRegex.test(formData.password)) {
    setError("Password must be at least 8 characters, include a letter, number, and special character.");
    return;
  }

  if (formData.password !== formData.confirmPassword) {
    setError("Passwords do not match.");
    return;
  }

  // Clear previous error
  setError("");

  const payload = {
    student_name: formData.student_name,
    email: formData.email,
    dob: formData.dob,
    gender: formData.gender,
    course: formData.course,
    password: formData.password,
  };

  try {
    const response = await fetch('http://localhost:8081/api/student/addStudent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      alert('Registration successful!');
      navigate('/studentLogin');
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
        <h2>Student Registration</h2>
        <form onSubmit={handleSubmit}>
        <label>Full Name:</label>
        <input type="text" name="student_name" value={formData.student_name} onChange={handleChange} required />

        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Date of Birth:</label>
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />

        <label>Gender:</label>
        <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
        </select>

        <label>Course:</label>
        <input type="text" name="course" value={formData.course} onChange={handleChange} required />

        <label>Password:</label>
        <input type="password" name="password" value={formData.password} placeholder="At least 8 characters, include a letter, number, and special character. " onChange={handleChange} required />

        <label>Confirm Password:</label>
        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />

        <button type="submit">Register</button>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div className="login-options">
            <Link to="/studentLogin">Already have an account? Login</Link>
            <br />
            <Link to="/">← Back</Link>
        </div>
        </form>
    </div>
    </div>
);
}
