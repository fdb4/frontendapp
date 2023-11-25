import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Cookies from 'js-cookie';
import "./initialsurveypage.css";
import VistorNavbar from "../../components/navbar-visitor/visitornav.js";

const API_URL = "http://127.0.0.1:5000";

const InitialSurveyPage = () => {

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

    	const id = Cookies.get("id");

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
	      !formData.martialarts ||
    	  !formData.other) 
    	{
     	 console.error("All fields are required.");
     	 return;
    	}

    	const updateData = {

    		...formData,
    		clientID: id
    	};

    	const type = formData.gender.toLowerCase() === 'male' ? 0:1;

    	try {

      		const sendData = {

        		...updateData,
        		gender: type,
      		};

      		const comm = await axios.post(`${API_URL}/survey`, sendData);
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
      					<label>
      					    Yes 
      						<input
      							type="radio"
      							name="cycling"
      							value="1"
      							value={formData.cycling === "1"}
      							onChange={handleChange}
      							required
      						/>
      					</label>
      					<label>
      						No 
      						<input
      							type="radio"
      							name="cycling"
      							value="0"
      							value={formData.cycling === "0"}
      							onChange={handleChange}
      							required
      						/>
      					</label>
      				</div>
      		</div>
      		<div className="radio-option">
      			<label>Strength:</label>
      				<div className="radio-group"> 
      					<label>
      					    Yes 
      						<input
      							type="radio"
      							name="strength"
      							value="1"
      							value={formData.strength === "1"}
      							onChange={handleChange}
      							required
      						/>
      					</label>
      					<label>
      						No 
      						<input
      							type="radio"
      							name="strength"
      							value="0"
      							value={formData.strength === "0"}
      							onChange={handleChange}
      							required
      						/>
      					</label>
      				</div>
      		</div>
      		<div className="radio-option">
      			<label>Running:</label>
      				<div className="radio-group"> 
      					<label>
      					    Yes 
      						<input
      							type="radio"
      							name="running"
      							value="1"
      							value={formData.running === "1"}
      							onChange={handleChange}
      							required
      						/>
      					</label>
      					<label>
      						No 
      						<input
      							type="radio"
      							name="running"
      							value="0"
      							value={formData.running === "0"}
      							onChange={handleChange}
      							required
      						/>
      					</label>
      				</div>
      		</div>
      		<div className="radio-option">
      			<label>Sports:</label>
      				<div className="radio-group"> 
      					<label>
      					    Yes 
      						<input
      							type="radio"
      							name="sports"
      							value="1"
      							value={formData.sports === "1"}
      							onChange={handleChange}
      							required
      						/>
      					</label>
      					<label>
      						No 
      						<input
      							type="radio"
      							name="sports"
      							value="0"
      							value={formData.sports === "0"}
      							onChange={handleChange}
      							required
      						/>
      					</label>
      				</div>
      		</div>
      		<div className="radio-option">
     				<label>Yoga:</label>
      				<div className="radio-group"> 
      					<label>
      					    Yes 
      						<input
      							type="radio"
      							name="yoga"
      							value="1"
      							value={formData.yoga === "1"}
      							onChange={handleChange}
      							required
      						/>
      					</label>
      					<label>
      						No 
      						<input
      							type="radio"
      							name="yoga"
      							value="0"
      							value={formData.yoga === "0"}
      							onChange={handleChange}
      							required
      						/>
      					</label>
      				</div>
      		</div>
      		<div className="radio-option">
      			<label>Swimming:</label>
      				<div className="radio-group"> 
      					<label>
      					    Yes 
      						<input
      							type="radio"
      							name="swimming"
      							value="1"
      							value={formData.swimming === "1"}
      							onChange={handleChange}
      							required
      						/>
      					</label>
      					<label>
      						No 
      						<input
      							type="radio"
      							name="swimming"
      							value="0"
      							value={formData.swimming === "0"}
      							onChange={handleChange}
      							required
      						/>
      					</label>
      				</div>
      		</div>
      		<div className="radio-option">
     				<label>Martial Arts:</label>
      				<div className="radio-group"> 
      					<label>
      					    Yes 
      						<input
      							type="radio"
      							name="martialarts"
      							value="1"
      							value={formData.martialarts === "1"}
      							onChange={handleChange}
      							required
      						/>
      					</label>
      					<label>
      						No 
      						<input
      							type="radio"
      							name="martialarts"
      							value="0"
      							value={formData.martialarts === "0"}
      							onChange={handleChange}
      							required
      						/>
      					</label>
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
