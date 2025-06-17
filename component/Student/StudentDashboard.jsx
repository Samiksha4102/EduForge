import React, { useEffect, useState } from "react";
import "./StudentDashboard.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function StudentDashboard() {
  const [selectedSection, setSelectedSection] = useState("profile");
  const [student, setStudent] = useState(null);
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);


  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  useEffect(() => {
    if (!email) {
      navigate("/studentLogin");
      return;
    }

    setLoading(true);

    axios.get(`http://localhost:8081/api/student/getProfile`, {
      params: { email }
    })
    .then(res => {
      setStudent(res.data);
      console.log("Student data:", res.data);
      setLoading(false);
    })
    .catch(error => {
      console.error("Error fetching student:", error);
      setLoading(false);
    });

    axios.get("http://localhost:8081/api/course/displayCourse")
      .then(res => setCourses(res.data))
      .catch(err => console.error("Error fetching courses:", err));

    axios.get(`http://localhost:8081/api/student/enrolledCourses`, {
      params: { email }
    })
    .then(res => setEnrolledCourses(res.data))
    .catch(err => console.error("Error fetching enrolled courses:", err));


    axios.get(`http://localhost:8081/api/notifications/forStudent`, {
  params: { email }
  })
  .then(res => setNotifications(res.data))
  .catch(err => console.error("Error fetching notifications:", err));

  }, [email, navigate]);

const enrollInCourse = (courseId) => {
  axios.post("http://localhost:8081/api/student/enroll", {
    email: email,
    course_id: courseId
  })
  .then(() => {
    axios.get(`http://localhost:8081/api/student/enrolledCourses`, {
      params: { email }
    }).then(res => {
      setEnrolledCourses(res.data);
    });

    axios.get(`http://localhost:8081/api/student/getProfile`, {
      params: { email }
    }).then(res => {
      setStudent(res.data);
      console.log("Profile after enrollment:", res.data);
    });
  })
  .catch(err => console.error("Enrollment failed:", err));
};

const unenrollFromCourse = (course_id) => {
  axios.delete("http://localhost:8081/api/student/unenroll", {
    params: { email, course_id }
  })
  .then(() => {
    axios.get(`http://localhost:8081/api/student/enrolledCourses`, {
      params: { email }
    })
    .then(res => setEnrolledCourses(res.data));
  })
  .catch(err => console.error("Unenrollment failed:", err));
};

const renderContent = () => {
    switch (selectedSection) {
      case "studentHome":
        return (
          <div>
            <h1>Welcome, {student?.studentName || "N/A"}</h1>
            <hr />
            <p>Your learning journey awaits.</p>
            <p>Explore your dashboard and start learning by selecting a section from the sidebar.</p>
          </div>
        );

      case "profile":
        return (
          <div>
            <h3>Profile</h3>
            <p><strong>Name:</strong> {student?.studentName || "N/A"}</p>
            <p><strong>Email:</strong> {student?.email || "N/A"}</p>
            <p><strong>Gender:</strong> {student?.gender || "N/A"}</p>
            <p><strong>DOB:</strong> {student?.dob || "N/A"}</p>
            <p><strong>Course:</strong> {student?.courseName || "N/A"}</p>
          </div>
        );

case "notifications":
  return (
    <div>
      <h3>Notifications</h3>
      {notifications.length === 0 ? (
        <p>No notifications available.</p>
      ) : (
        <ul>
          {notifications.map((note, idx) => (
            <li key={idx} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "8px", borderRadius: "5px" }}>
              <h4>{note.title}</h4>
              <p>{note.message}</p>
              <small>{new Date(note.timestamp).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

case "courses":
  return (
    <div>
      <h3>Available Courses</h3>
      {courses.map(course => {

        const isEnrolled = enrolledCourses.some(enrolled => enrolled.courseName === course.courseName);

        return (
          <div key={course.course_id} style={{ border: "2px solid #ccc", marginBottom: "10px", padding: "10px" }}>
            <h4><u>{course.courseName}</u></h4>
            <p><strong>Description:</strong> {course.description}</p>
            <p><strong>Instructor:</strong> {course.instructorName}</p>
            <button
              onClick={() =>
                isEnrolled
                  ? unenrollFromCourse(course.course_id)
                  : enrollInCourse(course.course_id)
              }
              style={{
                backgroundColor: isEnrolled ? "#ff4d4d" : "#4CAF50",
                color: "white",
                padding: "6px 12px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              {isEnrolled ? "Unenroll" : "Enroll"}
            </button>
          </div>
        );
      })}
    </div>
  );
      default:
        return null;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInStudent");
    localStorage.removeItem("email");
    navigate("/studentLogin");
  };

  return (
    <div className="student-container">
      <div className="sidebar">
        <h2>Student Panel</h2>
        <ul>
          <li className={selectedSection === "studentHome" ? "active" : ""} onClick={() => setSelectedSection("studentHome")}>
            Home
          </li>
          <li className={selectedSection === "profile" ? "active" : ""} onClick={() => setSelectedSection("profile")}>
            My Profile
          </li>
          <li className={selectedSection === "courses" ? "active" : ""} onClick={() => setSelectedSection("courses")}>
            Courses
          </li>
          <li className={selectedSection === "notifications" ? "active" : ""} onClick={() => setSelectedSection("notifications")}>
          Notifications
          </li>

          <li onClick={handleLogout}>Logout</li>
        </ul>
      </div>
      <div className="content">
        {loading ? <p>Loading...</p> : renderContent()}
      </div>
    </div>
  );
}
