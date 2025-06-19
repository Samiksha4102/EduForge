import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function About() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <section>
   <header>
        <div className="welcome-message">About</div>
        <nav>
          <ul>
            <li><Link to="/" className={isActive("/") ? "active" : ""}>Home</Link></li>
            <li><Link to="/contact" className={isActive("/contact") ? "active" : ""}>Contact</Link></li>
          </ul>
        </nav>
      </header>

      <p className="text-center text-lg">
        We aim to revolutionize education by offering a modern, user-friendly platform
        for students, instructors, and administrators. Our mission is to make learning
        accessible, efficient, and enjoyable.
      </p>

      <div className="mt-8 text-center">
        <p className="text-lg">We believe in empowering education through technology.</p><br />
        <p className="text-lg">Together, let's build a smarter learning future!</p>
      </div>
    </section>
  );
}
