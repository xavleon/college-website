import React from "react";
import "./Login.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      let data = {
        email,
        password,
      };

      const res = await axios.post(
        "https://college-website-68cz.onrender.com/api/users/login",
        data
      );

      if (res.status === 200) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/");
        return;
      }

      setError("Invalid email or password");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div class="background">
        <div class="shape"></div>
        <div class="shape"></div>
      </div>
      <form onSubmit={handleLogin}>
        <h3>Login Here</h3>

        <label for="email">Email</label>
        <input
          type="email"
          placeholder="Email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label for="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p>{error}</p>}
        <button>Log In</button>
        <div class="social" style={{ cursor: "pointer" }}>
          <div class="go" onClick={() => navigate("/signup")}>
            <i class="fab fa-google"></i> Signup
          </div>
          <div class="fb">
            <i class="fab fa-facebook"></i> Facebook
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
