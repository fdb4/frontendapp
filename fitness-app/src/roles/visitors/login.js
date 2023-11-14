import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Import Axios

import "./login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Send POST request to the backend with JSON data
      const response = await axios.post("http://127.0.0.1:5000/docs/login", formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Handle the response, such as storing tokens or updating UI
      console.log("Login successful:", response.data);
    } catch (error) {
      // Handle errors, such as displaying error messages
      console.error("Error during login:", error);
    }
  };
  
  return (
    <div className="login-page">
      <div className="login-modal">
        <h1>Login </h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div>
            <label>Email </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Password </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/registration">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
