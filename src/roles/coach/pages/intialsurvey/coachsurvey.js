import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../client/pages/initialsurvey/clientsurvey.css";
import CoachNavbar from "../../../../components/navbar-visitor/coachnav.js";
import Cookies from "js-cookie";
import ClientNavbar from "../../../../components/navbar-visitor/clientnav.js";
import API_URL from "../../../../components/navbar-visitor/apiConfig.js";

const role = Cookies.get("role");

const CoachSurvey = () => {
  const clientID = Cookies.get("id");
  const navigate = useNavigate();
  const [priceError, setPriceError] = useState("");
  const [experienceError, setExperienceError] = useState("");

  const [data, setData] = useState({
    clientID: "",
    price: "",
    experience: "",
    bio: "",
    gym: "",
    town: "",
    state: "",
  });

  const requestData = {
    ...data,
    clientID: clientID,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValidPrice = /^\d+(\.\d{2})?$/.test(data.price);

    if (!isValidPrice || isNaN(data.price) || data.price < 0) {
      setPriceError(
        "Please enter a valid positive number with up to two decimal places."
      );
      return;
    } else {
      setPriceError("");
    }

    const isValidExperience = /^\d+$/.test(data.experience);

    if (!isValidExperience || data.experience <= 0) {
      setExperienceError("Please enter a valid positive integer.");
      return;
    } else {
      setExperienceError("");
    }

    try {
      console.log(requestData);
      const response = await axios.post(`${API_URL}/coachSignUp`, requestData);

      const result = response.data;
      console.log("Registering with data:", requestData);
      console.log("Response:", result);
      navigate("/clienthome");
    } catch (error) {
      console.error("Error", error.message);
    }
  };

  return (
    <div className="initial-survey-page">
      <ClientNavbar />
      <br />
      <div className="survey-modal-container">
        <div className="survey-modal">
          <h1>Coach Initial Survey</h1>
          <form onSubmit={handleSubmit} className="initial-survey-form">
            <h2>Extra Information</h2>
            <div>
              <label>
                Hourly Price:
                <input
                  type="number"
                  name="price"
                  value={data.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  required
                />
              </label>
              {priceError && <h9 style={{ color: "red" }}>{priceError}</h9>}
            </div>

            <br />

            <div>
              <label>
                Years of Experience:
                <input
                  type="number"
                  name="experience"
                  value={data.experience}
                  onChange={handleChange}
                  required
                />
              </label>
              {experienceError && (
                <h9 style={{ color: "red" }}>{experienceError}</h9>
              )}
            </div>

            <br />

            <div>
              <label>
                Gym Name:
                <input
                  type="text"
                  name="gym"
                  value={data.gym}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <br />

            <div>
              <label>
                Current Town:
                <input
                  type="text"
                  name="town"
                  value={data.town}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <br />

            <div>
              <label>
                Current State:
                <input
                  type="text"
                  name="state"
                  value={data.state}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <br />

            <div>
              <label>
                Bio:
                <textarea
                  placeholder="Enter your bio"
                  name="bio"
                  value={data.bio}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <button type="submit" className="submit-button">
              Submit Survey
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CoachSurvey;
