import React from 'react'
import axios from 'axios';

const Logout = () => {

    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:5000/api/auth/logout");
        } catch (err) {
            console.log("Logout error", err);
        } finally {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
    }

    const token = localStorage.getItem("token");
    
  return (
    <>
    
      <nav>
    {token ? (
      <button onClick={handleLogout}>Logout</button>
    ) : (
      <>
        <a href="/login">Login</a>
        <a href="/register">Register</a>
      </>
    )}
  </nav>
    </>
  )
}

export default Logout
