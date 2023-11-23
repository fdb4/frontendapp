import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "../styling/initialsurveypage.css";
import CurrencyInput from 'react-currency-input-field'
import TextField from '@mui/material/TextField';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import InputAdornment from '@mui/material/InputAdornment';

const API_URL = "http://127.0.0.1:5000";

const CoachSurvey = () => {
    const [date, setDate] = useState(null);
    const [price, setPrice] = useState(null);
    const [priceError, setPriceError] = useState("");
    
    const handleDateChange = (newValue) => {
        setDate(newValue);
    }; 

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
    	setData({
    	  ...data,
    	  [name]: value,
    	});
 	};

     const handleSubmit = async (e) => {
    	e.preventDefault();
        const originalDate = new Date(date);
        const formattedDate = originalDate.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
        console.log(formattedDate)
        setData({
            ...data,
            ['experience']: 'hey'
        })
        setData({
            ...data,
            ['price']: price
        })

    	if (
	    //   !data.id ||
    	  !data.price ||
	      !data.experience ||
    	  !data.bio ||
	      !data.gym ||
    	  !data.town ||
	      !data.state) 
    	{
            console.log(data)
     	 console.error("All fields are required.");
     	 return;
    	}

        const priceValue = parseFloat(price);
        if (isNaN(priceValue) || priceValue < 0) {
          setPriceError("Please enter a valid positive float for price");
          return;
        } else {
          setPriceError(null);
        }
        console.log(data)
    	try {
      		const comm = await axios.post(`${API_URL}/coachSignUp`, data);
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
                            <TextField
                                id="price"
                                variant="filled"
                                error={Boolean(priceError)}
                                helperText={priceError || ' '}
                                required type = "number"
                                value={price}
                                onChange={(event) => setPrice(event.target.value)}
                                sx={{ width: '300px'}}
                            />                  
                        </div>

                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <div>
                            <label>First Coaching Experience Date:</label>
                            <DatePicker
                            renderInput={(props) => (
                                <TextField
                                {...props}
                                InputProps={{ style: { color: 'black' } }} // Set the desired text color
                                />
                            )}
                            value={date}
                            onChange={handleDateChange}
                            format="yyyy-MM-dd"
                            required
                            />
                        </div>
                        </LocalizationProvider>

                        <br />

                        <div>
                        <label>Gym Name</label>
                        <TextField
                            variant="outlined"
                            fullWidth
                            name="gym"
                            value={data.gym}
                            onChange={handleChange}
                            required
                        />
                        </div>

                        <br />

                        <div>
                        <label>Current Town</label>
                        <TextField
                            variant="outlined"
                            fullWidth
                            name="town"
                            value={data.town}
                            onChange={handleChange}
                            required
                        />
                        </div>
                        
                        <br />

                        <div>
                        <label>Current State</label>
                        <TextField
                            variant="outlined"
                            fullWidth
                            name="state"
                            value={data.state}
                            onChange={handleChange}
                            required
                        />
                        </div>

                        <br />

                        <div>
                        <label>Bio</label>
                        <TextareaAutosize
                            aria-label="bio-input"
                            minRows={3} // Set the minimum number of rows
                            placeholder="Enter your bio"
                            name="bio"
                            value={data.bio}
                            onChange={handleChange}
                            style={{ width: '95%' }}
                        />
                        </div>
                        
                        <button type="submit" className="submit-button">Submit Survey</button>
                    </form> 
                </div>
            </div>
        </div>
    );
}

export default CoachSurvey