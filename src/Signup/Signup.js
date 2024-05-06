import React from "react";
import "./Signup.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      let data = {
        username: firstName + lastName,
        email: email,
        password: password,
      };

      const res = await axios.post(
        "https://66346caf9bb0df2359a17e9e.mockapi.io/user",
        data //2 parameters api url and data to be posted
      );
      console.log(res);

      if (res.status === 201) {
        alert("Sigup successfully, Do Login");
        navigate("/login");
      } else {
        setError("Internal Server Error");
      }
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
      <form onSubmit={handleSignup}>
        <h3>Signup Here</h3>
        <label for="username">Name</label>
        <div class="signup-name">
          <input
            type="text"
            placeholder="First"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <label for="username">Email</label>
        <input
          type="text"
          placeholder="Email Address"
          id="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label for="password">Password</label>
        <input
          type="password"
          placeholder="must be at least 8 characters long"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p>{error}</p>}
        <button>Sign Up</button>
        <div className="question">
          Have an accout?
          <div class="social">
            <div class="go">Login Instead</div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
