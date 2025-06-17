import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './StudentLogin.css';

export default function StudentForgotPassword() {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
        setMessage("Passwords do not match!");
        return;
    }

    try {
        const response = await fetch("http://localhost:8081/api/student/resetPassword", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, newPassword }),
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || "Failed to reset password");
        }
        setMessage("Password successfully updated!");
    } catch (err) {
        console.error(err);
        setMessage("Error: " + err.message);
    }
};


    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Forgot Password</h2>
                <form onSubmit={handleResetPassword}>
                    <label>Email:</label>
                    <input
                        type="email"
                        placeholder="Enter your registered email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label>New Password:</label>
                    <input
                        type="password"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />

                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />

                    <button type="submit">Change Password</button>

                    {message && <p style={{ color: 'red' }}>{message}</p>}

                    <div className="login-options">
                        <Link to="/studentLogin">← Back to Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
