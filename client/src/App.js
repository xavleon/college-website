import "./App.css";
import React from "react";
import Hero from "./Hero/Hero";
import Nav from "./Navbar/Navbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Footer_1 from "./Footer/Footer";
import Content from "./Content/Content";
import Hero2 from "./Hero2/Hero2";
import Login from "./Login/Login";
import Landing from "./Landing/Landing";
import About from "./About/About";
import VideoCollection from "./Pages/VideoCollection/VideoCollection";
import video from "./Pages/VideoCollection/VideoData";
import Signup from "./Signup/Signup";
import Services from "./Pages/ServicesPage/Services";
import Pricing from "./Pages/PricingPage/Pricing";
import Contact from "./Pages/ContactPage/Contact";
import VideoPage from "./Pages/VideoCollection/VideoPage";
import BlogPage from "./Pages/BlogPage/BlogPage";
import ToggleSwitch from "./ToggleSwitch/ToggleSwitch";
import Assignments from "./Pages/AssignmentsPage/Assignments";
import GradeManagement from "./Pages/GradesPage/GradeManagement";
import ProfessorRequest from "./components/ProfessorRequest/ProfessorRequest";
import ProfessorRequests from "./components/Admin/ProfessorRequests";
import Calendar from "./Pages/CalendarPage/Calendar";

// Protected Route component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

function App() {
  return (
    <div className="App">
      <React.StrictMode>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route path="/hero" element={<VideoCollection video={video} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/services" element={<Services />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/video-page" element={<VideoPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/assignments" element={<Assignments />} />
            <Route path="/calendar" element={<Calendar />} />

            {/* Grade Management Routes */}
            <Route
              path="/grades"
              element={
                <ProtectedRoute allowedRoles={["student", "professor"]}>
                  <GradeManagement />
                </ProtectedRoute>
              }
            />

            {/* Professor Request Routes */}
            <Route
              path="/request-professor"
              element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <ProfessorRequest />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manage-requests"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <ProfessorRequests />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    </div>
  );
}

export default App;
