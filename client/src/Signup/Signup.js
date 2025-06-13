import React from "react";
import "./Signup.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { Toast } from "flowbite-react";
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";

const Signup = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log(firstName, lastName, email, password);

    //Discoverd tha this is not needed because the backend handles this error
    // if (password !== confirmPassword) {
    //   setError("Passwords do not match");
    //   return;
    // }

    try {
      let data = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        passwordConfirm: confirmPassword,
        password: password,
      };

      const res = await axios.post(
        "http://localhost:5000/api/users/signup/",
        data //2 parameters api url and data to be posted
      );
      console.log(res);

      if (res.status === 201) {
        setShowToast(true);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError("Internal Server Error");
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div>
      <Navbar />
      {showToast && (
        <div class="center-toast">
          <Toast className="slide-in-from-top">
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
              <HiCheck className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">Signup Successful !</div>
            <Toast.Toggle />
          </Toast>
        </div>
      )}
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
        <label for="confirmPassword">Confirm Password</label>
        <input
          type="password"
          placeholder="must be at least 8 characters long"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {error && <p>{error}</p>}
        <button>Sign Up</button>
        <div className="question">
          Have an accout?
          <div class="social" style={{ cursor: "pointer" }}>
            <div onClick={() => navigate("/login")} class="go">
              Login{" "}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
