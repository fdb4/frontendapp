import React, { useState } from "react";
import { Link } from "react-router-dom";
import './registration.css'

const Registration = () => {
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
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
    // Add your registration logic here
    console.log("Registering with data:", formData);
  };

  return (
    <div className="registration-page">
      <div className="registration-modal">
        <h1>Registration</h1>
        <form onSubmit={handleSubmit} className="registration-form">
          <div>
            <label>First Name </label>
            <input
              type="text"
              name="fName"
              value={formData.fName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Last Name </label>
            <input
              type="text"
              name="lName"
              value={formData.lName}
              onChange={handleChange}
              required
            />
          </div>
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
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Registration;
