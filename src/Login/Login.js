import React from "react";
import "./Login.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        "https://66346caf9bb0df2359a17e9e.mockapi.io/user"
      );

      res.data.map((user) => {
        if (user.username === username && user.password === password) {
          localStorage.setItem("username", user.username);
          navigate("/");
          return;
        }
      });

      setError("Invalid username or password");
    } catch (error) {
      setError("Something went wrong");
    }
  };

  return (
    <div>
      <div class="background">
        <div class="shape"></div>
        <div class="shape"></div>
      </div>
      <form onSubmit={handleLogin}>
        <h3>Login Here</h3>

        <label for="username">Username</label>
        <input
          type="text"
          placeholder="Email or Phone"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
        <div class="social">
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
