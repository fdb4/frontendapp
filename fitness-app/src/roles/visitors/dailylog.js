import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import VistorNavbar from "../../components/navbar-visitor/visitornav.js";

const API_URL = "http://127.0.0.1:5000";

const DailyLog = () => {

	const[formData, setFormData] = useState ({

		calorie: '',
		water: '',
		mood: '',
		date: '',
	});

	const handleChange = (e) => {
    	const { name, value } = e.target;
    	setFormData({
    	  ...formData,
    	  [name]: value,
    	});
 	};

 	const handleSubmit = async (e) => {
 		e.preventDefault();

 		if(
 			!formData.calorie ||
 			!formData.water ||
 			!formData.mood ||
 			!formData.date) 
 		{
 			console.error("All fields are required.");
     		return;
 		}

 		try {

      		const comm = await axios.post(`${API_URL}/dailylog`, formData);
      		console.log("Registering with data:", formData);
      		console.log("Response:", comm.data);
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
 	};

 	return (
    	<div className="daily-tracker-page">
      		<div className="tracker-modal-container">
        		<div className="tracker-modal">
          			<h1>Daily Mood Tracker</h1>
          			<form onSubmit={handleSubmit} className="daily-tracker-form">
            			<div>
              				<label>Calorie Intake</label>
              				<input
                				type="number"
                				name="calorieIntake"
                				value={trackerData.calorieIntake}
                				onChange={handleChange}
                				required
              				/>
            			</div>
            			<div>
              				<label>Water Intake (liters)</label>
              					<input
                					type="number"
                					name="waterIntake"
                					value={trackerData.waterIntake}
                					onChange={handleChange}
                					required
              					/>
            			</div>
            			<div>
            			  	<label>Mood</label>
              					<input
                					type="text"
                					name="mood"
                					value={trackerData.mood}
                					onChange={handleChange}
                					required
              					/>
            			</div>
            			<button type="submit" className="submit-button">Submit</button>
          			</form>
        		</div>
      		</div>
    	</div>
  	);
};

export default DailyLog;
