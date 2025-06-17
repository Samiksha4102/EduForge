import React, { useEffect, useState } from "react";
import "./InstructorDashboard.css";
import { useNavigate } from "react-router-dom";

export default function InstructorDashboard() {
const [selectedSection, setSelectedSection] = useState("profile");
const [instructor, setInstructor] = useState(null);
const [loading, setLoading] = useState(false);
const navigate = useNavigate();
const [error, setError] = useState(null);

useEffect(() => {
const storedInstructor = localStorage.getItem("loggedInInstructor");
if (storedInstructor) {
    const parsed = JSON.parse(storedInstructor);
    if (parsed.email) {
    setLoading(true);
    fetch(`http://localhost:8081/api/instructor/getProfile?email=${parsed.email}`)
        .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch profile");
        return res.json();
        })
        .then((data) => {
        setInstructor(data);
        setLoading(false);
        })
        .catch((err) => {
        console.error(err);
        setError("Unable to load instructor profile.");
        setLoading(false);
        });
    } else {
    setError("Stored instructor data missing email");
    }
} else {
    setError("No logged-in instructor info found");
}
}, []);



const renderContent = () => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!instructor) return <p>No instructor data available</p>;

    switch (selectedSection) {
    case "home":
        return (
        <div>
            <br /><hr />
            <p>Ready to inspire? <br />Manage your courses and  view your profile using the sidebar options.</p>
        </div>
        );
    case "profile":
        return (
        <div>
            <h3>Profile</h3>
            <p><strong>Name:</strong> {instructor.username || "N/A"}</p>
            <p><strong>Courses:</strong> {instructor.courseName?.join(", ") || "N/A"}</p>
            <p><strong>Experience:</strong> {instructor.experience || "N/A"}</p>
            <p><strong>Email:</strong> {instructor.email || "N/A"}</p>

        </div>
        );
    default:
        return null;
    }
};

const handleLogout = () => {
    localStorage.removeItem("loggedInInstructor");
    navigate("/instructorLogin");
};

return (
    <div className="instructor-container">
    <div className="sidebar">
        <h2>Instructor Panel</h2>
        <ul>
        <li className={selectedSection === "home" ? "active" : ""} onClick={() => setSelectedSection("home")}>
            Home
        </li>
        <li className={selectedSection === "profile" ? "active" : ""} onClick={() => setSelectedSection("profile")}>
            My Profile
        </li>
        <li onClick={handleLogout}>Logout</li>
        </ul>
    </div>

    <div className="content">
        <h2>Welcome, {instructor?.username || "Instructor"}!</h2>
        {renderContent()}
    </div>
    </div>
);
}
