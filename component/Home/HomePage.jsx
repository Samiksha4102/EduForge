import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import learningImg from "./learning.jpg";


export default function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="app-wrapper">

      <header>
        <div className="welcome-message">
          <img src="/logo.jpg" alt="EduForge Logo" style={{ height: "30px", marginLeft: "10px" }} />
          <span>  Welcome to EduForge </span>
        </div>
        <nav>
          <ul>
            <li><Link to="/" className={isActive("/") ? "active" : ""}>Home</Link></li>
            <li><Link to="/about" className={isActive("/about") ? "active" : ""}>About</Link></li>
            <li><Link to="/contact" className={isActive("/contact") ? "active" : ""}>Contact</Link></li>
            <li><Link to="/adminLogin" className={isActive("/adminLogin") ? "active" : ""}>Admin </Link></li>
            <li><Link to="/instructorLogin" className={isActive("/instructorLogin") ? "active" : ""}>Instructor </Link></li>
          </ul>
        </nav>
      </header>

  <section className="main-content styled-message">
  <div className="message-container">
    <h2 className="headline">🚀 Transform Your Future with <span className="brand">EduForge</span></h2>
    <p className="message-text">
      Pune’s Premier Training Institute is here to <b>ignite your career journey</b>. <br />
      Our <b>industry-aligned courses</b> are designed to prepare you for in-demand roles with a focus on real-world skills, hands-on training, and expert mentorship.<br />
      <span className="highlight-text">Now is the time to invest in your growth and stand out in a competitive job market.</span>
    </p>

<button
  onClick={() => navigate("/studentLogin")}
  style={{
    color: "#FFC764",             // Text color
    backgroundColor: "#212121",   // Background color
    border: "none",
    padding: "12px 28px",
    fontSize: "1rem",
    borderRadius: "30px",
    cursor: "pointer"
  }}
>
  Sign Up
</button>

  </div>
</section>

<section className="learning-benefits">
  <div className="learning-content">
    <div className="learning-text">
      <h2>🔥 Why Choose EduForge?</h2>
      <ul>
        <li>📘 Project Based Learning</li>
        <li>💼 Internship of 6 months</li>
        <li>🧠 Work on Live Projects</li>
        <li>🤝 Work on Client's Projects</li>
        <li>💸 Internship with Stipend</li>
        <li>📜 Internship Certificate</li>
      </ul>
    </div>
    <div className="learning-img">
  <img src={learningImg} alt="Learning Benefits" />
</div>

  </div>
</section>


<section className="course-listing">
  <h2>📚 Our Popular Courses</h2>
  <div className="course-grid">
    <div className="course-card">Full Stack Web Development</div>
    <div className="course-card">Java Backend with Spring Boot</div>
    <div className="course-card">Data Structures & Algorithms</div>
    <div className="course-card">Frontend with React.js</div>
    <div className="course-card">Database & SQL Mastery</div>
    <div className="course-card">UI/UX</div>
    <div className="course-card">Machine Learning Basics</div>
  </div>
</section>

<section className="reviews-section">
  <h2>🌟Student Reviews</h2>
  <div className="review-cards">
    <div className="review-card">
      <p>"EduForge transformed my career. The mentors are amazing!"</p>
      <span>- Riya S., Software Engineer</span>
    </div>
    <div className="review-card">
      <p>"Loved the live projects! Helped me land a paid internship."</p>
      <span>- Amit M., MCA Student</span>
    </div>
    <div className="review-card">
      <p>"Courses are practical and up-to-date with industry needs."</p>
      <span>- Sneha T., B.Tech Final Year</span>
    </div>
  </div>
</section>
<br />
<br />


      <footer>
        &copy; {new Date().getFullYear()} LMS. All rights reserved.
      </footer>
    </div>
  );
}
