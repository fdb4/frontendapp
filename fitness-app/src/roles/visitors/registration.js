import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './registration.css'

const API_URL = 'http://127.0.0.1:5000';

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

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(!formData.fName || !formData.lName || !formData.email || !formData.password) {

      console.error("All fields are required.");
      return;
    }

    try {

      const comm = await axios.post(`${API_URL}/signup`, formData);
      console.log("Registering with data:", formData);
      console.log("Response:", comm.data);

      navigate(`${API_URL}/login`);
    }
    catch(error) {

      if(error.response) {

        console.error("Error response:", error.response.data);
      }
      else if(error.request) {

        console.error("No response:", error.request);
      }
      else {

        console.error("Error", error.message);
      }
    }
  }

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
