import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../public/style.css";

const Login = ({ setRole }) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // ✅ Token store karo
      localStorage.setItem("token", response.data.token);

      // ✅ Role store karo
      localStorage.setItem("role", response.data.role);

      // ✅ User object store karo — Dashboard ke liye zaroori hai
      localStorage.setItem("user", JSON.stringify(response.data.user));

      setRole(response.data.role);

      setSuccess("Login Successful");

      // ✅ Role ke hisaab se redirect karo
      if (response.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }

    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <h2>Login Page</h2>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <input
          type="text"
          name="email"
          placeholder="Enter Your Email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Your Password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={userLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;