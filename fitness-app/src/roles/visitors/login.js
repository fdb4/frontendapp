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
  const { setAuth } = useAuth()

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
        withCredentials: true,
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (response.ok) {
        // onLogin();
        console.log(data)
        setLoginMessage(data.message);
        const accessToken = data?.access_token;
        // const roles = data?.roles;
        setAuth({accessToken})
        const expirationDate = new Date(new Date().getTime() + 15 * 60 * 1000);
        // const expirationDate = new Date(new Date().getTime() + 30 * 1000);
        Cookies.set('accessToken', accessToken, { expires: expirationDate });
        navigate(from, { replace: true });

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