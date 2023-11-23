import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
// import "./initialsurveypage.css";
import VistorNavbar from "../../components/navbar-visitor/visitornav.js";
import CurrencyInput from 'react-currency-input-field'
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/material/AdapterDateFns';
import LocalizationProvider from '@mui/material/LocalizationProvider';
import DatePicker from '@mui/material/DatePicker';
import TextareaAutosize from '@mui/material/TextareaAutosize';

const API_URL = "http://127.0.0.1:5000";

const CoachSurvey = () => {
    const [data, setData] = useState({
        id: '',
        price: '',
        experience: '',
        bio: '',
        gym: '',
        town: '',
        state: '',
    })

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
	      !data.id ||
    	  !data.price ||
	      !data.experience ||
    	  !data.bio ||
	      !data.gym ||
    	  !data.town ||
	      !data.state) 
    	{
     	 console.error("All fields are required.");
     	 return;
    	}
        console.log(data)
    	try {
      		const comm = await axios.post(`${API_URL}/signup`, data);
      		console.log("Registering with data:", data);
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

    return(
        <div className="initial-survey-page">
            <div className = "survey-modal-container">
                <div className = "survey-modal">
                    <h1>Coach Initial Survey</h1>
                    <form onSubmit={handleSubmit} className="initial-survey-form">
                        <h2>Extra Information</h2>
                        <div>
                            <label>Hourly Price: </label>
                            <CurrencyInput
                                name="price"
                                value={data.price}
                                onValueChange={(value) => handleChange('price', value)}
                                prefix="$"
                                decimalsLimit={2} 
                                required
                            />                       
                        </div>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <div>
                            <label>First Coaching Experience Date:</label>
                            <DatePicker
                            name="experience"
                            value={data.experience}
                            onChange={handleChange}
                            renderInput={(props) => <TextField {...props} />}
                            required
                            />
                        </div>
                        </LocalizationProvider>
                        <div>
                        <lable>Gym Name</lable>
                        <TextField
                            label="Enter Text"
                            variant="outlined"
                            fullWidth
                            name="gym"
                            value={data.gym}
                            onChange={handleChange}
                            required
                        />
                        </div>
                        <div>
                        <lable>Current Town</lable>
                        <TextField
                            label="Enter Text"
                            variant="outlined"
                            fullWidth
                            name="town"
                            value={data.town}
                            onChange={handleChange}
                            required
                        />
                        </div>
                        <div>
                        <lable>Current State</lable>
                        <TextField
                            label="Enter Text"
                            variant="outlined"
                            fullWidth
                            name="state"
                            value={data.state}
                            onChange={handleChange}
                            required
                        />
                        </div>
                        <div>
                        <TextareaAutosize
                            aria-label="bio-input"
                            minRows={3} // Set the minimum number of rows
                            placeholder="Enter your bio"
                            name="bio"
                            value={data.bio}
                            onChange={handleChange}
                            style={{ width: '100%' }}
                        />
                        </div>
                        <button type="submit" className="submit-button">Submit Survey</button>
                    </form> 
                </div>
            </div>
        </div>
    );
}