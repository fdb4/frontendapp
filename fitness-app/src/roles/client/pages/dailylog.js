import React, { useState } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import '../styling/dailylog.css'
import ClientNavbar  from "../../../components/navbar-visitor/clientnav.js";

const API_URL = "http://127.0.0.1:5000";

const DailyLog = () => {

	const smiles = ["😟", "😕", "😐", "🙂", "😀"]

	const[formData, setFormData] = useState ({

		clientID: '',
		calorie: '',
		water: '',
		mood: '',
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

 		const id = Cookies.get("id");

 		if(
 			!formData.calorie ||
 			!formData.water ||
 			!formData.mood) 
 		{
 			console.error("All fields are required.");
     		return;
 		}

 		const sendData = {

    		...formData,
    		clientID: id
    };

 		try {

      const comm = await axios.post(`${API_URL}/dailyLog`, sendData);
      console.log("Registering with data:", sendData);
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

	const setSmile = smiles[formData.mood - 1] || smiles[0]

	return (
    <div className="daily-tracker-page">
      <ClientNavbar />
      <div className="tracker-content-container">
        <div className="tracker-modal">
          <h1>Daily Log</h1>
          <form onSubmit={handleSubmit} className="daily-tracker-form">
            <div className="input-section">
              <label>Water Intake(mL) </label>
              <input
                type="number"
                name="water"
                value={formData.water}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-section">
              <label>Calorie Intake </label>
              <input
                type="number"
                name="calorie"
                value={formData.calorie}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-section">
              <label>Daily Mood </label>
              <input
                type="range"
                className="slider"
                name="mood"
                min="1"
                max="5"
                value={formData.mood}
                onChange={handleChange}
                required
              />
              <div className="mood-display">{setSmile}</div>
            </div>
            <button type="submit" className="submit-button">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DailyLog;
