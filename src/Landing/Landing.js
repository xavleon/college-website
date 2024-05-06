import React, { useEffect } from "react";

import Hero from "../Hero/Hero";
import Nav from "../Navbar/Navbar";
import Footer_1 from "../Footer/Footer";
import Content from "../Content/Content";
import Hero2 from "../Hero2/Hero2";
import { useNavigate } from "react-router-dom";
const Landing = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  useEffect(() => {
    if (!username) {
      alert("Please login to continue");
      navigate("/login");
    }
  }, [username, navigate]);
  return (
    <>
      <Nav />
      <Hero />
      <Hero2 />
      <Content />
      <Footer_1 />
    </>
  );
};

export default Landing;
