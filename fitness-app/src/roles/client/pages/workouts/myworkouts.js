import React, { useState, useEffect } from "react";
import ClientNavbar from "../../../../components/navbar-visitor/clientnav";
import { useNavigate } from "react-router-dom";
import "./styling/myworkouts.css";

function Myworkouts() {
  const navigate = useNavigate();
  const [limitReachedMessage, setLimitReachedMessage] = useState("");
  const [error, setError] = useState("");

  const [showWorkoutForm, setShowWorkoutForm] = useState(false);
  const [workoutPlan, setWorkoutPlan] = useState({
    sessionsName: "",
    selectedExercises: [],
  });
  const [allExercises, setAllExercises] = useState([]);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/workouts");
        const exercises = await response.json();
        setAllExercises(exercises);
      } catch (error) {
        setError("Error fetching exercises. Please try again.");
      }
    };

    fetchExercises();
  }, []);

  const handleGoBack = () => {
    navigate("/workouts");
  };

  const handleCreateWorkout = () => {
    setShowWorkoutForm(true);
  };

  const handleCancelCreateWorkout = () => {
    setShowWorkoutForm(false);
  };


  const handleAddExercise = () => {
    // Check if the limit (10 exercises) has been reached
    if (workoutPlan.selectedExercises.length < 10) {
      setWorkoutPlan((prev) => ({
        ...prev,
        selectedExercises: [
          ...prev.selectedExercises,
          { exerciseID: null, sets: 0, reps: 0, time: 0 },
        ],
      }));
    } else {
      setLimitReachedMessage("You've reached the limit of 10 exercises per session.");
    }
  };

  const handleDeleteExercise = (index) => {
    setLimitReachedMessage(""); // Clear the limitReachedMessage
    setWorkoutPlan((prev) => {
      const updatedExercises = [...prev.selectedExercises];
      updatedExercises.splice(index, 1);
      return { ...prev, selectedExercises: updatedExercises };
    });
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    setWorkoutPlan((prev) => {
      const updatedExercises = [...prev.selectedExercises];
      updatedExercises[index][name] = value;
      return { ...prev, selectedExercises: updatedExercises };
    });
  };

  const handleSessionNameChange = (event) => {
    const { value } = event.target;
    setWorkoutPlan((prev) => ({ ...prev, sessionsName: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch("http://127.0.0.1:5000/workout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(workoutPlan),
      });
  
      if (response.ok) {
        // Workout plan submitted successfully
        console.log("Workout Plan submitted:", workoutPlan);
        // Optionally, reset the form or navigate away
        setShowWorkoutForm(false);
      } else {
        // Handle server error
        console.error("Failed to submit workout plan:", response.statusText);
      }
    } catch (error) {
      // Handle network error
      console.error("Network error:", error.message);
    }
  };
  
  return (
    <div className="body">
      <ClientNavbar />
      <div className="individual">
        <div className="rightside">
          <div className="header">
            <button onClick={handleGoBack}>Back</button>
            <h1>My Workout</h1>
            {showWorkoutForm ? (
              <>
                <button onClick={handleCreateWorkout}>Create Workout</button>
              </>
            ) : (
              <button onClick={handleCreateWorkout}>Create Workout</button>
            )}
          </div>
          <div className="formstyling">
            {showWorkoutForm && (
              <form onSubmit={handleSubmit}>
                <label>Sessions Name:</label>
                <input
                  type="text"
                  name="sessionsName"
                  value={workoutPlan.sessionsName}
                  onChange={handleSessionNameChange}
                />
                {workoutPlan.selectedExercises.map((exercise, index) => (
                  <div key={index} className="exercise-form">
                    <label>Select Exercise:</label>
                    <select
                      name="exerciseID"
                      value={exercise.exerciseID || ""}
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
                      name="sets"
                      value={exercise.sets}
                      onChange={(event) => handleInputChange(index, event)}
                    />
                    <label>Reps:</label>
                    <input
                      type="number"
                      name="reps"
                      value={exercise.reps}
                      onChange={(event) => handleInputChange(index, event)}
                    />
                    <label>Time:</label>
                    <input
                      type="number"
                      name="time"
                      value={exercise.time}
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
                  <button className="cancel_2" type="button" onClick={handleCancelCreateWorkout}>
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Myworkouts;
