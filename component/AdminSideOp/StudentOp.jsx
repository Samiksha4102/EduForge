import React, { useEffect, useState } from "react";

export default function StudentOp() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [editFormData, setEditFormData] = useState({
    student_name: "",
    email: "",
    dob: "",
    gender: "",
    password: "",
    courseName: "",
  });

  useEffect(() => {
    fetch("http://localhost:8081/api/student/displayStudent")
      .then(res => res.json())
      .then(data => {
        console.log("Fetched students:", data);
        setStudents(data);
      })
      .catch(err => {
        console.error("Failed to fetch students:", err);
      });
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Delete this student?")) return;
    fetch(`http://localhost:8081/api/student/deleteStudent/${id}`, {
      method: "DELETE",
    })
      .then(res => {
        if (!res.ok) throw new Error("Delete failed");
        setStudents(prev => prev.filter(s => s.student_id !== id));
      })
      .catch(err => {
        console.error("Delete error:", err);
        alert("Failed to delete student.");
      });
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setEditFormData({
      student_name: student.student_name || "",
      email: student.email || "",
      dob: student.dob || "",
      gender: student.gender || "",
      password: student.password || "",
      courseName: student.courseName || "",
    });
  };

  const handleUpdate = () => {
    const updatedStudent = {
      student_name: editFormData.student_name,
      email: editFormData.email,
      dob: editFormData.dob,
      gender: editFormData.gender,
      password: editFormData.password,
      courseName: editFormData.courseName,
    };

    fetch(`http://localhost:8081/api/student/updateStudent/${editingStudent.student_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedStudent),
    })
      .then(res => {
        if (!res.ok) throw new Error("Update failed");
        return res.json();
      })
      .then(updated => {
        setStudents(prev => prev.map(s => s.student_id === updated.student_id ? updated : s));
        setEditingStudent(null);
      })
      .catch(err => {
        console.error("Update error:", err);
        alert("Failed to update student.");
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Panel</h1>
      <h2>Students</h2>
      <table className="styled-table" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>DOB</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.student_id}>
              <td>{student.student_id}</td>
              <td>{student.student_name}</td>
              <td>{student.email}</td>
              <td>{student.dob}</td>
              <td>{student.gender}</td>
                <td>
  {student.courseName?.length > 0 ? student.courseName.map((course) => course.courseName).join(", ") : "N/A"}
  <td>
</td>

</td>




              <td>
                <button onClick={() => handleEdit(student)} style={{ marginRight: "8px" }}>Edit</button>
                <button onClick={() => handleDelete(student.student_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingStudent && (
        <div style={{ marginTop: "20px" }}>
          <h3>Edit Student</h3>
          <input
            name="student_name"
            value={editFormData.student_name}
            onChange={e => setEditFormData({ ...editFormData, student_name: e.target.value })}
            placeholder="Name"
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
          <input
            type="date"
            name="dob"
            value={editFormData.dob}
            onChange={e => setEditFormData({ ...editFormData, dob: e.target.value })}
            placeholder="Date of Birth"
            style={{ marginRight: "8px" }}
          />
          <input
            name="gender"
            value={editFormData.gender}
            onChange={e => setEditFormData({ ...editFormData, gender: e.target.value })}
            placeholder="Gender"
            style={{ marginRight: "8px" }}
          />
          <input
            type="text"
            name="password"
            value={editFormData.password}
            onChange={e => setEditFormData({ ...editFormData, password: e.target.value })}
            placeholder="Password"
            style={{ marginRight: "8px" }}
          />
          <input
            name="course"
            value={editFormData.courseName}
            onChange={e => setEditFormData({ ...editFormData, courseName: e.target.value })}
            placeholder="Course Name or ID"
            style={{ marginRight: "8px" }}
          />
          <button onClick={handleUpdate}>Update</button>
          <button onClick={() => setEditingStudent(null)} style={{ marginLeft: "8px" }}>Cancel</button>
        </div>
      )}
    </div>
  );
}

