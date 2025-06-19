import React, { useEffect, useState } from "react";

export default function CourseOp() {
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  
  const [editFormData, setEditFormData] = useState({
    courseName: "",
    description: "",
    duration: "",
    instructorName: "",
  });

  // Fetch all courses from backend
  useEffect(() => {
    fetch("http://localhost:8081/api/course/displayCourse")
      .then(res => res.json())
      .then(data => {
        console.log("Fetched courses:", data);
        console.log("Is array:", Array.isArray(data));
        setCourses(data);
      })
      .catch(err => {
        console.error("Failed to fetch courses:", err);
      });
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Delete this course?")) return;
    fetch(`http://localhost:8081/api/course/deleteCourse/${id}`, {
      method: "DELETE",
    })
      .then(res => {
        if (!res.ok) throw new Error("Delete failed");
        setCourses(prev => prev.filter(c => c.course_id !== id));
      })
      .catch(err => {
        console.error("Delete error:", err);
        alert("Failed to delete course.");
      });
  };

  // Start editing course
  const handleEdit = (course) => {
    setEditingCourse(course);
    setEditFormData({
      courseName: course.courseName || "",
      description: course.description || "",
      duration: course.duration || "",
      instructorName: course.instructorName || "",
    });
  };

  // Update course info
  const handleUpdate = () => {
    const updatedCourse = {
      courseName: editFormData.courseName,
      description: editFormData.description,
      duration: editFormData.duration,
      instructorName: editFormData.instructorName,

};


    fetch(`http://localhost:8081/api/course/updateCourse/${editingCourse.course_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedCourse),
    })
      .then(res => {
        if (!res.ok) throw new Error("Update failed");
        return res.json();
      })
      .then(updated => {
        setCourses(prev => prev.map(c => c.course_id === updated.course_id ? updated : c));
        setEditingCourse(null);
      })
      .catch(err => {
        console.error("Update error:", err);
        alert("Failed to update course.");
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Panel</h1>
      <h2>Courses</h2>
      <table className="styled-table" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Course Name</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Instructor</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
  {!Array.isArray(courses) || courses.length === 0 ? (
    <tr>
      <td colSpan="6" style={{ textAlign: "center" }}>No courses available</td>
    </tr>
  ) : (
    courses.map(course => (
      <tr key={course.course_id}>
        <td>{course.course_id}</td>
        <td>{course.courseName}</td>
        <td>{course.description}</td>
        <td>{course.duration}</td>
        <td>{course.instructorName}</td>
        <td>
          <button onClick={() => handleEdit(course)} style={{ marginRight: "8px" }}>Edit</button>
          <button onClick={() => handleDelete(course.course_id)}>Delete</button>
        </td>
      </tr>
    ))
  )}
</tbody>

      </table>

      {editingCourse && (
        <div style={{ marginTop: "20px" }}>
          <h3>Edit Course</h3>
          <input
            name="courseName"
            value={editFormData.courseName}
            onChange={e => setEditFormData({ ...editFormData, courseName: e.target.value })}
            placeholder="Course Name"
            style={{ marginRight: "8px" }}
          />
          <input
            name="description"
            value={editFormData.description}
            onChange={e => setEditFormData({ ...editFormData, description: e.target.value })}
            placeholder="Description"
            style={{ marginRight: "8px" }}
          />
          <input
            name="duration"
            value={editFormData.duration}
            onChange={e => setEditFormData({ ...editFormData, duration: e.target.value })}
            placeholder="Duration"
            style={{ marginRight: "8px" }}
          />
          <input
            name="instructorName"
            value={editFormData.instructorName}
            onChange={(e) => setEditFormData({ ...editFormData, instructorName: e.target.value })}
            placeholder="Instructor Name"
            style={{ marginRight: "8px" }}
          />

          <button onClick={handleUpdate}>Update</button>
          <button onClick={() => setEditingCourse(null)} style={{ marginLeft: "8px" }}>Cancel</button>
        </div>
      )}
    </div>
  );
}
