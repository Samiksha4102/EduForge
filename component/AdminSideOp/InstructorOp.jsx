import React, { useEffect, useState } from "react";

export default function InstructorOp() {
  const [instructors, setInstructors] = useState([]);
  const [editingInstructor, setEditingInstructor] = useState(null);
  const [editFormData, setEditFormData] = useState({
    username: "",
    courseName: "",
    experience: "",
    email: "",
  });

  useEffect(() => {
    fetch("http://localhost:8081/api/instructor/displayInstructor")
      .then(res => res.json())
      .then(data => {
        console.log("Fetched instructors:", data);
        setInstructors(data);
      })
      .catch(err => {
        console.error("Failed to fetch instructors:", err);
      });
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Delete this instructor?")) return;
    fetch(`http://localhost:8081/api/instructor/deleteInstructor/${id}`, {
      method: "DELETE",
    })
      .then(res => {
        if (!res.ok) throw new Error("Delete failed");
        setInstructors(prev => prev.filter(i => i.instructor_id !== id));
      })
      .catch(err => {
        console.error("Delete error:", err);
        alert("Failed to delete instructor.");
      });
  };

  const handleEdit = (instructor) => {
    setEditingInstructor(instructor);
    setEditFormData({
      username: instructor.username || "",
      courseName: instructor.courseName ? String(instructor.courseName) : "",
      experience: instructor.experience ? String(instructor.experience) : "",
      email: instructor.email || "",
    });
  };

  const handleUpdate = () => {
    const updatedInstructor = {
      username: editFormData.username,
      email: editFormData.email,
      experience: parseFloat(editFormData.experience),
      courseName: parseInt(editFormData.courseName),
    };

    fetch(`http://localhost:8081/api/instructor/updateInstructor/${editingInstructor.instructor_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedInstructor),
    })
      .then(res => {
        if (!res.ok) throw new Error("Update failed");
        return res.json();
      })
      .then(updated => {
        setInstructors(prev => prev.map(i => i.instructor_id === updated.instructor_id ? updated : i));
        setEditingInstructor(null);
      })
      .catch(err => {
        console.error("Update error:", err);
        alert("Failed to update instructor.");
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Panel</h1>
      <h2>Instructors</h2>
      <table className="styled-table" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Courses</th>
            <th>Experience (Years)</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {instructors.map(instructor => (
            <tr key={instructor.instructor_id}>
              <td>{instructor.instructor_id}</td>
              <td>{instructor.username}</td>
              <td>{instructor.courseName?.join(", ")|| "N/A"}</td>
              <td>{instructor.experience}</td>
              <td>{instructor.email}</td>
              <td>
                <button onClick={() => handleEdit(instructor)} style={{ marginRight: "8px" }}>Edit</button>
                <button onClick={() => handleDelete(instructor.instructor_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingInstructor && (
        <div style={{ marginTop: "20px" }}>
          <h3>Edit Instructor</h3>
          <input
            name="username"
            value={editFormData.username}
            onChange={e => setEditFormData({ ...editFormData, username: e.target.value })}
            placeholder="Username"
            style={{ marginRight: "8px" }}
          />
          <input
            name="courseName"
            value={editFormData.courseName}
            onChange={e => setEditFormData({ ...editFormData, courseName: e.target.value })}
            placeholder="Course ID"
            style={{ marginRight: "8px" }}
          />
          <input
            name="experience"
            value={editFormData.experience}
            onChange={e => setEditFormData({ ...editFormData, experience: e.target.value })}
            placeholder="Experience"
            style={{ marginRight: "8px" }}
          />
          <input
            type="email"
            name="email"
            value={editFormData.email}
            onChange={e => setEditFormData({ ...editFormData, email: e.target.value })}
            placeholder="Email"
            style={{ marginRight: "8px" }}
          />
          <button onClick={handleUpdate}>Update</button>
          <button onClick={() => setEditingInstructor(null)} style={{ marginLeft: "8px" }}>Cancel</button>
        </div>
      )}
    </div>
  );
}
