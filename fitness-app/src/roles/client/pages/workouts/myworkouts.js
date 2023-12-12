import React, { useState, useEffect } from "react";
import ClientNavbar from "../../../../components/navbar-visitor/clientnav";
import { useNavigate } from "react-router-dom";
import "./styling/myworkouts.css";
import Cookies from "js-cookie";

function Myworkouts() {
  const clientID = Cookies.get("id");
  const navigate = useNavigate();
  const [limitReachedMessage, setLimitReachedMessage] = useState("");
  const [error, setError] = useState("");

  const [showWorkoutForm, setShowWorkoutForm] = useState(false);
  const [workoutPlan, setWorkoutPlan] = useState({
    planName: "",
    clientID: clientID,
    exercises: [],
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
      const response = await fetch(
        `http://127.0.0.1:5000/create/workoutplan/client`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(workoutPlan),
        }
      );

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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Myworkouts;
