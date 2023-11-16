import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import VistorNavbar from "../../components/navbar-visitor/vistornav.js";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loginMessage, setLoginMessage] = useState(null);

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
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        onLogin();
        setLoginMessage(data.message);
        navigate('/clienthome');
      } else {
        setLoginMessage(data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setLoginMessage("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <VistorNavbar />
      <div className="login-container">
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
          {loginMessage && (
            <p className={loginMessage.ok ? "success-message" : "error-message"}>{loginMessage}</p>
          )}
          <p>
            Don't have an account? <Link to="/registration">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
