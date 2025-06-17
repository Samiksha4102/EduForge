import React from "react";

import { Link, useLocation } from "react-router-dom";

export default function Contact() {
      const location = useLocation();
    
      const isActive = (path) => location.pathname === path;

  return (
    <section>

      <header>
             <div className="welcome-message">Contact</div>
             <nav>
               <ul>
                 <li><Link to="/" className={isActive("/") ? "active" : ""}>Home</Link></li>
                 <li><Link to="/about" className={isActive("/about") ? "active" : ""}>About</Link></li>
               </ul>
             </nav>
           </header>

      
      
      <div className="mt-10 text-center">
        <p className="text-2xl text-green-700 font-semibold">
          We are here to assist you with any queries or support you need.
        </p>
        <p className="text-2xl text-orange-600 font-semibold mt-2">
          Feel free to reach out to us anytime!
        </p>
      </div>

    <br />
    <hr className="border-t-2 border-gray-300 my-8" /><br/>
      <p className="text-center text-xl text-purple-800">
        For any inquiries, support, or feedback, please contact us at:
      </p>
      <p className="text-center text-xl text-green-600">🌐 Website: <a href="https://lms.co.in" className="hover:underline underline-offset-2">lms.co.in</a></p>
      <p className="text-center text-xl text-blue-700">📞 Phone: 999 999 9999</p>
      <p className="text-center text-xl text-red-600">
        📧 Email:{" "}
        <a
          href="mailto:contact@lms.co.in"
          className="hover:underline underline-offset-2"
        >
          contact@lms.co.in
        </a>
      </p>

    </section>
  );
}
