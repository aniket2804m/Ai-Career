import React from 'react'
import axios from 'axios';
import API_BASE_URL from '../src/config/api.js';

const Logout = () => {

    const handleLogout = async () => {
        try {
            await axios.post(`${API_BASE_URL}/api/auth/logout`);
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
