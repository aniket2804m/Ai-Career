import React, { useState } from "react";
import axios from "axios";
import "../public/style.css";
import { useNavigate } from "react-router-dom";

const Register = () => {

  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail ] = useState("");
  const [password, setPassword] = useState("");

  const userRgister = async() => {
    try {

    await axios.post("http://localhost:5000/api/auth/register",{
        name,
        email, 
        password
    });
      setSuccess("User registered successfully");
      navigate("/login");

    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="auth-wrapper">
    <div className="auth-container">
      <h2>Register Page</h2>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <input
        type="text"
        name="name"
        placeholder="Enter Your Name"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        name="email"
        placeholder="Enter Your Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        name="password"
        placeholder="Enter Your Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={userRgister}>Register</button>
    </div>

    </div>
  );
};

export default Register;
