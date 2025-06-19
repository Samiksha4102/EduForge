import React, { useState } from 'react';

export default function PostNotification() {
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    target: 'ALL'
  });

  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    fetch("http://localhost:8081/api/notifications/post", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(formData)
})
.then(res => res.json())
.then(data => {
  console.log(data.message);
  setSuccess(data.message);
  setFormData({ title: '', message: '', target: 'ALL' }); // reset form
})
.catch(err => console.error("Error:", err));
    
  };

  return (
    <div>
      <h3>Post Notification</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <label>Title:</label>
        <input name="title" value={formData.title} onChange={handleChange} required />

        <label>Message:</label>
        <textarea name="message" value={formData.message} onChange={handleChange} required />

        <label>Target (ALL, course name, or student email):</label>
        <input name="target" value={formData.target} onChange={handleChange} />

        <button type="submit">Send</button>
      </form>

      {success && <p style={{ color: "green", marginTop: "10px" }}>{success}</p>}
    </div>
  );
}
