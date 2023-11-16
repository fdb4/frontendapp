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

  const [loginError, setLoginError] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState(null);

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
      // Send login credentials to the backend
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Parse the JSON response
      const data = await response.json();

      if (response.ok) {
        // Successful login
        console.log("Login successful:", data);

        // Call the onLogin prop to update the App state
        onLogin();

        // Set success message
        setLoginSuccess("Login successful!");

        // Redirect to the protected route
        navigate('/clienthome');
      } else {
        // Login failed
        console.log("Login failed:", data.error);

        // Set error message
        setLoginError(data.error);
      }
    } catch (error) {
      console.error("Error during login:", error);

      // Set generic error message
      setLoginError("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="body_1">
      <VistorNavbar />
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password</label>
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
      {loginSuccess && <p className="success-message">{loginSuccess}</p>}
      {loginError && <p className="error-message">{loginError}</p>}
      <p>
        Don't have an account? <Link to="/registration">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
