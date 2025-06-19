import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import HomePage from './component/Home/HomePage';
import About from './component/Home/About';
import Contact from './component/Home/Contact';


import AdminLogin from './component/AdminSideOp/AdminLogin';
import AdminDashboard from './component/AdminSideOp/AdminDashboard';

import CourseOp from './component/AdminSideOp/CourseOp';
import InstructorOp from './component/AdminSideOp/InstructorOp';
import StudentOp from './component/AdminSideOp/StudentOp';
import PostNotification from './component/AdminSideOp/PostNotification';

import StudentLogin from './component/Student/StudentLogin';
import StudentRegister from './component/Student/StudentRegister';
import StudentForgotPassword from './component/Student/StudentForgotPassword';
import StudentDashboard from './component/Student/StudentDashboard';

import InstructorLogin from './component/Instructor/InstructorLogin';
import InstructorRegister from './component/Instructor/InstructorRegister';
import InstructorForgotPassword from './component/Instructor/InstructorForgotPassword';
import InstructorDashboard from './component/Instructor/InstructorDashboard';


function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />

          <Route path="/adminDashboard/CourseOp" element={<CourseOp />} />
          <Route path="/adminDashboard/InstructorOp" element={<InstructorOp />} />
          <Route path="/adminDashboard/StudentOp" element={<StudentOp />} />
          <Route path="/adminDashboard/PostNotification" element={<PostNotification />} />


          <Route path="/studentLogin" element={<StudentLogin />} />
          <Route path="/studentRegister" element={<StudentRegister />} />
          <Route path="/studentForgotPassword" element={<StudentForgotPassword />} />
          <Route path="/studentDashboard" element={<StudentDashboard />} />



          <Route path="/instructorLogin" element={<InstructorLogin />} />
          <Route path="/instructorRegister" element={<InstructorRegister />} />
          <Route path="/instructorForgotPassword" element={<InstructorForgotPassword/>}/>
          <Route path="/instructorDashboard" element={<InstructorDashboard/>}/>

        </Routes>
      </div>
    </Router>
  );
}

export default App;
