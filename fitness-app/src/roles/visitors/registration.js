import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './registration.css'

const API_URL = 'http://127.0.0.1:5000';

const Registration = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    userType: ""
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
    
    if(!formData.firstname || !formData.lastname || !formData.email || !formData.password || !formData.userType) {

      console.error("All fields are required.");
      return;
    }

    const type = formData.userType === 'coach' ? 1:0;

    try {

      const sendData = {

        ...formData,
        userType: type,
      };

      const comm = await axios.post(`${API_URL}/signup`, sendData);
      console.log("Registering with data:", sendData);
      console.log("Response:", comm.data);

      navigate(`/login`);
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
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Last Name </label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
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
          <div>
            <label>User Type </label>
            <select
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              required
            >
              <option value="">Select...</option>
              <option value="coach">Coach</option>
              <option value="client">Client</option>
            </select>
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