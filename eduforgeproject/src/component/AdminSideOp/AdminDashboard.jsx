import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import InstructorOp from "./InstructorOp";
import CourseOp from "./CourseOp";
import StudentOp from "./StudentOp";
import PostNotification from "./PostNotification";

export default function AdminDashboard() {
  const [selectedSection, setSelectedSection] = useState("courses");

  const navigate = useNavigate();

  const handleLogout = () => {
        navigate("/");
  };

const renderCourses = () => <CourseOp />;
const renderInstructors = () => <InstructorOp />;
const renderStudents = () => <StudentOp />;
const renderPostNotification = () => <PostNotification />;

  const renderContent = () => {
    switch (selectedSection) {
      case "adminHome":
        return (
          <div>
            <h3>Welcome to the Admin Dashboard</h3>
            <p>Select a section from the sidebar to manage courses, instructors, or students.</p>
          </div>
        );
      case "courses":
        return (
          <div>
            {renderCourses()}
          </div>
        );
      case "instructors":
        return (
          <div>
            {renderInstructors()}
          </div>
        );
      case "students":
        return (
          <div>
            {renderStudents()}
          </div>
        );
        case "postNotification":
        return (
          <div>
            {renderPostNotification()}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="admin-container">
      <div className="sidebar">
        <h1>Admin Panel</h1>
        <ul>
          <li
            className={selectedSection === "adminHome" ? "active" : ""}
            onClick={() => setSelectedSection("adminHome")}
          >
            Home
          </li>

          <li
            className={selectedSection === "courses" ? "active" : ""}
            onClick={() => setSelectedSection("courses")}
          >
            Courses
          </li>
          <li
            className={selectedSection === "instructors" ? "active" : ""}
            onClick={() => setSelectedSection("instructors")}
          >
            Instructors
          </li>
          <li
            className={selectedSection === "students" ? "active" : ""}
            onClick={() => setSelectedSection("students")}
          >
            Students
          </li>
          <li
            className={selectedSection === "postNotification" ? "active" : ""}
            onClick={() => setSelectedSection("postNotification")}
          >
            Post Notification
          </li>
          <li className="logout" onClick={handleLogout}>
            Logout
          </li>
        </ul>
      </div>

      <div className="content">
        {renderContent()}
      </div>
    </div>
  );
}
