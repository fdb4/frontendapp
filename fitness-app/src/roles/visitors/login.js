import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../visitors/styling/login.css";
import VistorNavbar from "../../components/navbar-visitor/vistornav.js";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your authentication logic here
    console.log("Logging in with data:", formData);

    // Assume successful login for demonstration purposes
    // In a real application, you would perform authentication and handle success/failure accordingly
    // For now, we'll simulate a successful login
    const isLoginSuccessful = true;

    if (isLoginSuccessful) {
      // Call the onLogin prop to update the App state
      onLogin();

      // Redirect to the protected route
      navigate('/clienthome');
    }
  };

  return (
    <div className="body_1">
      <VistorNavbar />
      <h1>Login </h1>
      <form onSubmit={handleSubmit}>
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
  );
};

export default Login;
