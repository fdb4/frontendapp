import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./login.css";
import VistorNavbar from "../../components/navbar-visitor/visitornav.js";
import { useAuth } from "../../components/navbar-visitor/auth.js";
import Cookies from 'js-cookie';


 
const Login = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const from = location.state?.from?.pathname || "/clienthome"


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

  
  const hashPassword = async (password) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);

    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashedPassword = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

    return hashedPassword;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Hash the password before sending it to the server
      const hashedPassword = await hashPassword(formData.password);

      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        body: JSON.stringify({ ...formData, password: hashedPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        // onLogin();
        console.log(data);
        setLoginMessage(data.message);
        const id = data?.clientID;
        let role = "";
        if (data?.isCoach === 0) {
          role = "Client";
        } else {
          role = "Coach";
        }
        Cookies.set("id", id);
        Cookies.set("role", role);
        navigate('/clientsurvey');
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
      <VistorNavbar/>
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
            Don't have an account? <Link className="link" to="/registration">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;