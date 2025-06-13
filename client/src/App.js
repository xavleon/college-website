import "./App.css";
import React from "react";
import Hero from "./Hero/Hero";
import Nav from "./Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    </div>
  );
}

export default App;
