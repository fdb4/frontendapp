import React, { useState, useEffect } from "react";
import ClientNavbar from "../../../components/navbar-visitor/clientnav";
import { useNavigate, useParams } from "react-router-dom";
import "../styling/createclientworkout.css";
import Cookies from "js-cookie";
import axios from "axios";
import API_URL from "../../../components/navbar-visitor/apiConfig";
import MessagePopup from "../../../components/navbar-visitor/MessagePopup";

function ClientWorkouts() {
  const { id: clientId } = useParams();
  const id = Cookies.get("id");
  const currentClientID = Cookies.get("currentClientID")
  const navigate = useNavigate();
  const [limitReachedMessage, setLimitReachedMessage] = useState("");
  const [error, setError] = useState("");
  const [showWorkoutForm, setShowWorkoutForm] = useState(false);
  const [workoutPlan, setWorkoutPlan] = useState({
    planName: "",
    clientID: currentClientID,
    exercises: [],
  });
  const [allExercises, setAllExercises] = useState([]);
  const [clientInfo, setClientInfo] = useState({});
  const [clientWorkoutSessions, setClientWorkoutSessions] = useState([]);
  const [groupedExercises, setGroupedExercises] = useState({});
  const [expandedWorkout, setExpandedWorkout] = useState(null);
  const [showCreateSuccess, setShowCreateSuccess] = useState(false);
  const [showCreateError, setShowCreateError] = useState(false);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch(`${API_URL}/workouts`);
        const exercises = await response.json();
        setAllExercises(exercises);
      } catch (error) {
        setError("Error fetching exercises. Please try again.");
      }
    };

    fetchExercises();
  }, []);

  useEffect(() => {

    const fetchWorkoutSessions = async () => {
      try {
        const response = await axios.get(`${API_URL}/workoutplans/client/${currentClientID}`);
        const data = response.data;
        const groupedWorkouts = data.reduce((acc, curr) => {
          (acc[curr.workoutplanID] = acc[curr.workoutplanID] || []).push(curr);
          return acc;
        }, {});
        setClientWorkoutSessions(groupedWorkouts);
      } 
      catch (error) {
        console.error("Error fetching workout sessions:", error);
        setError(error.message || "Failed to fetch workout sessions");
      }
    };

    fetchWorkoutSessions();
  }, [currentClientID]);

  const getWorkoutNameById = (workoutId) => {
    const workout = allExercises.find((entry) => entry.workoutID === workoutId);
    return workout ? workout.workoutname : "Workout not found";
  };

  const handleToggle = (workoutplanID) => {
    setExpandedWorkout(expandedWorkout === workoutplanID ? null : workoutplanID);
  };

  useEffect(() => {
    fetch(`${API_URL}/genInfo/${currentClientID}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => setClientInfo(data[0]))
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message);
      });

    const fetchExercises = async () => {
      try {
        const response = await fetch(`${API_URL}/workouts`);
        const exercises = await response.json();
        setAllExercises(exercises);
      } catch (error) {
        setError("Error fetching exercises. Please try again.");
      }
    };

    fetchExercises();
  }, []);

  const handleGoBack = () => {
    navigate("/coachhome");
  };

  const handleCreateWorkout = () => {
    setShowWorkoutForm(true);
  };

  const handleCancelCreateWorkout = () => {
    setShowWorkoutForm(false);
  };

  const handleAddExercise = () => {
    // Check if the limit (10 exercises) has been reached
    if (workoutPlan.exercises.length < 10) {
      setWorkoutPlan((prev) => ({
        ...prev,
        exercises: [...prev.exercises, { workoutID: null, Sets: 0, reps: 0 }],
      }));
    } else {
      setLimitReachedMessage(
        "You've reached the limit of 10 exercises per session."
      );
    }
  };

  const handleDeleteExercise = (index) => {
    setLimitReachedMessage(""); // Clear the limitReachedMessage
    setWorkoutPlan((prev) => {
      const updatedExercises = [...prev.exercises];
      updatedExercises.splice(index, 1);
      return { ...prev, exercises: updatedExercises };
    });
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    setWorkoutPlan((prev) => {
      const updatedExercises = [...prev.exercises];
      updatedExercises[index][name] = value;
      return { ...prev, exercises: updatedExercises };
    });
  };

  const handleSessionNameChange = (event) => {
    const { value } = event.target;
    setWorkoutPlan((prev) => ({ ...prev, planName: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(workoutPlan);
    try {
      const response = await fetch(`${API_URL}/create/workoutplan/client`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(workoutPlan),
      });

      if (response.ok) {
        console.log("Workout Plan submitted:", workoutPlan);
        setShowWorkoutForm(false);
        setShowCreateSuccess(true); // Set success message state
        setShowCreateError(false);
      } else {
        console.error("Failed to submit workout plan:", response.statusText);
        setShowCreateError(true); // Set error message state
        setShowCreateSuccess(false);
      }
    } catch (error) {
      console.error("Network error:", error.message);
      setShowCreateError(true); // Set error message state
      setShowCreateSuccess(false);
    }
  };

  return (
    <div className="body">
      <ClientNavbar />
      <div className="individual">
        <div className="rightside">
          <div className="header">
            <h1>
              {clientInfo.firstname && clientInfo.lastname 
              ? `Create ${clientInfo.firstname} ${clientInfo.lastname}'s Workout` 
              : 'Loading...'}
            </h1>
            {showWorkoutForm ? (
              <>
                <button onClick={handleCreateWorkout}>Create Workout</button>
              </>
            ) : (
              <button onClick={handleCreateWorkout}>Create Workout</button>
            )}
            <button onClick={handleGoBack}>Back</button>
          </div>
          <div className="formstyling">
            {showWorkoutForm && (
              <form onSubmit={handleSubmit}>
                <label>Sessions Name:</label>
                <input
                  type="text"
                  name="planName"
                  value={workoutPlan.planName}
                  onChange={handleSessionNameChange}
                />
                {workoutPlan.exercises.map((exercise, index) => (
                  <div key={index} className="exercise-form">
                    <label>Select Exercise:</label>
                    <select
                      name="workoutID"
                      value={exercise.workoutID || ""}
                      onChange={(event) => handleInputChange(index, event)}
                    >
                      <option value="" disabled>
                        Select an Exercise
                      </option>
                      {allExercises.map((option) => (
                        <option key={option.workoutID} value={option.workoutID}>
                          {option.workoutname}
                        </option>
                      ))}
                    </select>
                    <label>Sets:</label>
                    <input
                      type="number"
                      name="Sets"
                      value={exercise.Sets}
                      onChange={(event) => handleInputChange(index, event)}
                    />
                    <label>Reps:</label>
                    <input
                      type="number"
                      name="reps"
                      value={exercise.reps}
                      onChange={(event) => handleInputChange(index, event)}
                    />

                    <button
                      type="button"
                      onClick={() => handleDeleteExercise(index)}
                    >
                      Delete Exercise
                    </button>
                  </div>
                ))}
                <button type="button" onClick={handleAddExercise}>
                  Add Exercise
                </button>
                {limitReachedMessage && <p>{limitReachedMessage}</p>}
                {error && <p>{error}</p>}
                <div>
                  <button type="submit">Submit Workout Plan</button>
                  <button
                    className="cancel_2"
                    type="button"
                    onClick={handleCancelCreateWorkout}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
            {showCreateSuccess && (
            <MessagePopup
              message={`Workout Plan Created Successfully!`}
            />
          )}
          {showCreateError && (
            <MessagePopup
              message={`Workout Plan Creation Failed! Try Again`}
            />
          )}
          </div>
        </div>
        <div className="workouts-info">
          <h2>{clientInfo.firstname}'s Workout Sessions</h2>
          {Object.entries(clientWorkoutSessions).map(([workoutplanID, exercises]) => (
            <div key={workoutplanID} className="workout-session">
              <div className = "workout-header" onClick={() => handleToggle(workoutplanID)}>
                <h3>Workout Plan: {exercises[0].planName}</h3>
                <span className ="dropdown-arrow">
                  {expandedWorkout === workoutplanID ? "▼" : "▶"}
                </span>
              </div>
              {expandedWorkout === workoutplanID && (
                <div className="exersise-list">
                  {exercises.map((exercise, index) => (
                    <div key={index}>
                      <p style = {{ color: 'black' }}>Exercise: {getWorkoutNameById(exercise.workoutID)}</p>
                      <p style = {{ color: 'black' }}>Sets: {exercise.Sets}</p>
                      <p style = {{ color: 'black' }}>Reps: {exercise.reps}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ClientWorkouts;
