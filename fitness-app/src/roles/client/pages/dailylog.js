import React, { useState } from "react";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../styling/dailylog.css'
import ClientNavbar  from "../../../components/navbar-visitor/clientnav.js";

const API_URL = "http://127.0.0.1:5000";

const DailyLog = () => {

	const smiles = ["😟", "😕", "😐", "🙂", "😀"];
  const weekDates = () => {

    const today = new Date();
    const firstDay = today.getDate() - today.getDay() + 1;
    const week = [];

    for (let i = 6; i >= 0; i--) {

      let day = new Date(today);
      day.setDate(day.getDate() - i);
      week.push(`${day.getMonth() + 1}/${day.getDate()}`);
    }
    return week;
  }

  const mapMood = (value) => {

    const smiles = ["😟", "😕", "😐", "🙂", "😀"]
    return smiles[Math.min(Math.max(Math.round(value), 1), 5) - 1];
  };

	const[formData, setFormData] = useState ({

		clientID: '',
		calorie: '',
		water: '',
		mood: '',
	});

  const[calGraphData, setCalGraphData] = useState({

    labels: weekDates(),
    datasets: [
      {
        label: 'Weekly Calorie Intake',
        data: [0, 0, 0, 0, 0, 0, 0],
        borderColor: 'rgb(167, 80, 62)',
        backgroundColor: 'rgb(255, 255, 255)',
      }
    ],
  });

  const[waterGraphData, setWaterGraphData] = useState({

    labels: weekDates(),
    datasets: [
      {
        label: 'Weekly Water Intake',
        data: [0, 0, 0, 0, 0, 0, 0],
        borderColor: 'rgb(167, 80, 62)',
        backgroundColor: 'rgb(255, 255, 255)',
      }
    ],
  });

  const [moodGraphData, setMoodGraphData] = useState({

    labels: weekDates(),
    datasets: [

      {
        label: 'Weekly Mood',
        data: [3, 3, 3, 3, 3, 3, 3],
        borderColor: 'rgb(167, 80, 62)',
        backgroundColor: 'rgb(255, 255, 255)',
      }
    ],
  });

  const moodOptions = {

    scales: {
      y: {
        min: 1,
        max: 5,
        ticks: {
          stepSize: 1,
          autoskip: false,
          callback: function(value) {

            return mapMood(value);
          }
        }
      }
    },
  };

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

      const comm = await axios.post(`${API_URL}/dailylog`, sendData);
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
        <div className="log-section">
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
      <div className="graph-section">
        <div className="graph-container">
          <Line data={calGraphData} />
        </div>
        <div className="graph-container">
          <Line data={waterGraphData} />
        </div>
        <div className="graph-container">
          <Line data={moodGraphData} options={moodOptions} />
        </div>
      </div>
    </div>
  );
};

export default DailyLog;
