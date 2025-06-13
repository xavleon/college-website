import React from "react";
import styles from "./ToggleSwitch.module.css";
import { useNavigate } from "react-router";

const ToggleSwitch = () => {
  const navigate = useNavigate();
  const handleChange = (e) => {
    setTimeout(() => {
      navigate("/pricing");
    }, 500);
  };
  return (
    <label className={styles.switch}>
      <input type="checkbox" onChange={handleChange} />
      <span className={styles.slider}>
        <div className={styles.title}>See Updated Blog Posts ! ></div>
      </span>
    </label>
  );
};

export default ToggleSwitch;
