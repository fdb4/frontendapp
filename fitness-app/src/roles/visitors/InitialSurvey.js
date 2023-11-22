import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import VistorNavbar from "../../components/navbar-visitor/visitornav.js";

const API_URL = "http://127.0.0.1:5000";

const InitialSurveyPage = {

	const [formData, setFormData] = useState({

		height: "",
		startweight: "",
		goalweight "",
		movementtype: "",
		age: "",
		gender: "",
		cycling: "",
		strength: "",
		running: "",
		sports: "",
		yoga: "",
		swimming: "",
		martialarts: "",
		other: ""
	})
}

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
 };

const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.height ||
      !formData.startWeight ||
      !formData.goalWeight ||
      !formData.movementType ||
      !formData.age ||
      !formData.gender ||
      !formData.cycling ||
      !formData.strength ||
      !formData.running ||
      !formData.sports ||
      !formData.yoga ||
      !formData.swimming ||
      !formData.martialarts ||
      !formData.other) 
    {
      console.error("All fields are required.");
      return;
    }

    const newData = {

      ...formData,
      userType: formData.userType === 'coach' ? 1:0
    };

    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Registering with data:", newData);
        console.log("Response:", data);

        navigate(`/login`);
      } else {
        const errorData = await response.json();
        console.error("Error response:", errorData);
      }
    } catch (error) {
      console.error("Error", error.message);
    }
};

return (
	<div className="initial-survey-page">
      <VistorNavbar />
      <div className="survey-container">
        <div className="survey-modal">
          <h1>Initial Survey</h1>
          <form onSubmit={handleSubmit} className="survey-form">
            {/* Survey form fields */}
            <button type="submit">Submit Survey</button>
          </form>
          {/* Additional content or links */}
        </div>
      </div>
    </div>
  );
};

export default InitialSurveyPage;