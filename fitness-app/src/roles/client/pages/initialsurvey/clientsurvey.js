import React, { useState, useEffect } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./clientsurvey.css";
import VistorNavbar from "../../../../components/navbar-visitor/clientnav.js";

const API_URL = "http://127.0.0.1:5000";

const InitialSurveyPage = () => {
	const navigate = useNavigate();
	const id = Cookies.get("id");
	const role = Cookies.get("role")


	const [formData, setFormData] = useState({

		clientID: "",
		height: "",
		weight: "",
		goalweight: "",
		movement: "",
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

    	if(!id) {
    		console.error("Client ID is not available...");
    		return;
    	}

    	if (
	      !formData.height ||
    	  !formData.weight ||
	      !formData.goalweight ||
    	  !formData.movement ||
	      !formData.age ||
    	  !formData.gender ||
	      !formData.cycling ||
    	  !formData.strength ||
	      !formData.running ||
    	  !formData.sports ||
    	  !formData.yoga ||
    	  !formData.swimming ||
    	  !formData.martialarts) 
    	{
     	 console.error("All fields are required.");
     	 return;
    	}

    	const updateData = {

    		...formData,
    		clientID: id
    	};

    	const convertHeight = (heightString) => {

    		if(!heightString) {

    			return 0;
    		}
    		const h = heightString.split("'");
    		const feet = parseInt(h[0], 10);
    		const inches = h[1] ? parseInt(h[1], 10) : 0

    		const total = (feet * 12) + inches;

    		return total;
    	};

    	const clientIDVal = parseInt(formData.clientID, 10);
    	const heightVal = convertHeight(formData.height);
    	const weightVal = parseInt(formData.weight, 10);
    	const goalweightVal = parseInt(formData.goalweight, 10)
    	const ageVal = parseInt(formData.age, 10);

    	const genderVal = formData.gender.toLowerCase() === 'male' ? 0:1;

    	const cyclingVal = formData.cycling.toLowerCase() === 'yes' ? 1:0
    	const strengthVal = formData.strength.toLowerCase() === 'yes' ? 1:0
    	const runningVal = formData.running.toLowerCase() === 'yes' ? 1:0
    	const sportsVal = formData.sports.toLowerCase() === 'yes' ? 1:0
    	const yogaVal = formData.yoga.toLowerCase() === 'yes' ? 1:0
    	const swimmingVal = formData.swimming.toLowerCase() === 'yes' ? 1:0
    	const martialartsVal = formData.martialarts.toLowerCase() === 'yes' ? 1:0

    	try {

      		const sendData = {

        		...updateData,
        		clientID: clientIDVal,
        		height: heightVal,
        		weight: weightVal,
        		goalweight: goalweightVal,
        		age: ageVal,
        		gender: genderVal,
        		cycling: cyclingVal,
        		strength: strengthVal,
        		running: runningVal,
        		sports: sportsVal,
        		yoga: yogaVal,
        		swimming: swimmingVal,
        		martialarts: martialartsVal
      		};

      		console.log("Registering with data:", sendData);
      		const comm = await axios.post(`${API_URL}/survey`, sendData);
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
    <div className="initial-survey-page">
      <VistorNavbar />
      <div className = "survey-modal-container">
      	<div className = "survey-modal">
      		<h1>Initial Survey</h1>
      		<form onSubmit={handleSubmit} className="initial-survey-form">
      			<h2>Personal Info</h2>
      			<div>
      				<label>Client ID </label>
      				<input
      					type="number"
      					name="clientID"
      					value={formData.clientID}
      					onChange={handleChange}
      					required
      					step="1"
      				/>
      			</div>
      			<div>
  						<label>Height </label>
  							<select
   		 						name="height"
    							value={formData.height}
    							onChange={handleChange}
    							required
  							>
    							<option value="">Select height...</option>
    							<option value="5'0">5'0</option>
		    					<option value="5'1">5'1</option>
    							<option value="5'2">5'2</option>
    							<option value="5'3">5'3</option>
    							<option value="5'4">5'4</option>
		    					<option value="5'5">5'5</option>
    							<option value="5'6">5'6</option>
    							<option value="5'7">5'7</option>
    							<option value="5'8">5'8</option>
		    					<option value="5'9">5'9</option>
    							<option value="5'10">5'0</option>
    							<option value="5'11">5'1</option>
    							<option value="6'0">6'0</option>
		    					<option value="6'1">6'1</option>
    							<option value="6'2">6'2</option>
    							<option value="6'3">6'3</option>
    							<option value="6'4">6'4</option>
		    					<option value="6'5">6'5</option>
    							<option value="6'6">6'6</option>
    							<option value="6'7">6'7</option>
    							<option value="6'8">6'8</option>
		    					<option value="6'9">6'9</option>
    							<option value="6'10">6'10</option>
    							<option value="6'11">6'11</option>
    							<option value="7'0">7'0</option>
		    					<option value="7'1">7'1</option>
    							<option value="7'2">7'2</option>
    							<option value="7'3">7'3</option>
    							<option value="7'4">7'4</option>
		    					<option value="7'5">7'5</option>
    							<option value="7'6">7'6</option>
    							<option value="7'7">7'7</option>
    							<option value="7'8">7'8</option>
		    					<option value="7'9">7'9</option>
    							<option value="7'10">7'10</option>
    							<option value="7'11">7'11</option>
		  					</select>
						</div>
						<div>
		     			<label>Starting Weight </label>
    			  	<input
   							type="number"
     						name="weight"
			     			value={formData.weight}
   							onChange={handleChange}
      					required
			      		step="1"
     					/>
      			</div>
      			<div>
      				<label>Age </label>
      				<input
      					type="number"
      					name="age"
      					value={formData.age}
      					onChange={handleChange}
      					required
      					step="1"
      				/>
      			</div>
      			<div>
	  					<label>Gender </label>
  						<select
   			 				name="gender"
    						value={formData.gender}
    						onChange={handleChange}
    						required
  						>
    						<option value="">Select Gender...</option>
    						<option value="male">Male</option>
    						<option value="female">Female</option>
  						</select>
						</div>
					<h2>Workout Info</h2>
					<div>
      			<label>Goal Weight </label>
      			<input
      				type="number"
      				name="goalweight"
      				value={formData.goalweight}
      				onChange={handleChange}
     					step="1"
     				/>
     			</div>
     			<div>
  					<label>Movement Type </label>
  							<select
   		 						name="movement"
    							value={formData.movement}
    							onChange={handleChange}
    							required
  							>
    							<option value="">Select a Movement Type...</option>
    							<option value="sedentary">Sedentary</option>
    							<option value="lightly">Lightly Active</option>
    							<option value="moderate">Moderately Active</option>
    							<option value="very">Very Active</option>
    						</select>
     			</div>
				<h3>Workout Interests</h3>
					<div className="radio-option">
      			<label>Cycling:</label>
      				<div className="radio-group"> 
      					<select
   			 					name="cycling"
    							value={formData.cycling}
    							onChange={handleChange}
    							required
  							>
    							<option value="">Select Option...</option>
    							<option value="yes">Yes</option>
    							<option value="no">No</option>
  							</select>
      				</div>
      		</div>
      		<div className="radio-option">
      			<label>Strength:</label>
      				<div className="radio-group"> 
      					<select
   			 					name="strength"
    							value={formData.strength}
    							onChange={handleChange}
    							required
  							>
    							<option value="">Select Option...</option>
    							<option value="yes">Yes</option>
    							<option value="no">No</option>
  							</select>
      				</div>
      		</div>
      		<div className="radio-option">
      			<label>Running:</label>
      				<div className="radio-group"> 
      					<select
   			 					name="running"
    							value={formData.running}
    							onChange={handleChange}
    							required
  							>
    							<option value="">Select Option...</option>
    							<option value="yes">Yes</option>
    							<option value="no">No</option>
  							</select>
      				</div>
      		</div>
      		<div className="radio-option">
      			<label>Sports:</label>
      				<div className="radio-group"> 
      					<select
   			 					name="sports"
    							value={formData.sports}
    							onChange={handleChange}
    							required
  							>
    							<option value="">Select Option...</option>
    							<option value="yes">Yes</option>
    							<option value="no">No</option>
  							</select>
      				</div>
      		</div>
      		<div className="radio-option">
     				<label>Yoga:</label>
      				<div className="radio-group"> 
      					<select
   			 					name="yoga"
    							value={formData.yoga}
    							onChange={handleChange}
    							required
  							>
    							<option value="">Select Option...</option>
    							<option value="yes">Yes</option>
    							<option value="no">No</option>
  							</select>
      				</div>
      		</div>
      		<div className="radio-option">
      			<label>Swimming:</label>
      				<div className="radio-group"> 
      					<select
   			 					name="swimming"
    							value={formData.swimming}
    							onChange={handleChange}
    							required
  							>
    							<option value="">Select Option...</option>
    							<option value="yes">Yes</option>
    							<option value="no">No</option>
  							</select>
      				</div>
      		</div>
      		<div className="radio-option">
     				<label>Martial Arts:</label>
      				<div className="radio-group"> 
      					<select
   			 					name="martialarts"
    							value={formData.martialarts}
    							onChange={handleChange}
    							required
  							>
    							<option value="">Select Option...</option>
    							<option value="yes">Yes</option>
    							<option value="no">No</option>
  							</select>
      				</div>
      			</div>
      			<div>
      				<label>
      					Other:
      					<textarea
      						name="other"
      						value={formData.other}
      						onChange={handleChange}
      						placeholder="Describe any other kind of training you might need..."
      					/>
      				</label>
      			</div>
      			<button type="submit" className="submit-button">Submit Survey</button>
     			</form>
      	</div>
      </div>
    </div>
  	);
};

export default InitialSurveyPage;
