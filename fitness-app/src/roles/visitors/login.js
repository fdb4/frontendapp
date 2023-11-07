import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../visitors/styling/login.css";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your authentication logic here
    console.log("Logging in with data:", formData);
  };

  return (
    <div className="body_1">
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
