import React, { useState } from "react";
import ClientNavbar from "../../../../components/navbar-visitor/clientnav";
import { useNavigate } from "react-router-dom";
import "../../styling/myworkouts.css";
import Pullups from "../../../visitors/assets/pullup.jpg";

function Myworkouts() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState("Push-Pull-Legs");
  const [workoutsPerWeek, setWorkoutsPerWeek] = useState(6);
  const [sessionDuration, setSessionDuration] = useState(60);

  const handleGoBack = () => {
    navigate("/workouts");
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleWorkoutSelect = (workoutType) => {
    setSelectedWorkout(workoutType);
    setIsEditing(false);
  };

  const handleSaveChanges = () => {
    // Implement logic to save changes to backend or local state
    setIsEditing(false);
  };

  return (
    <div className="body">
      <ClientNavbar />
      <div className="individual">
        <div className="rightside">
          <div className="header">
            <h1>My Workout</h1>
            <button onClick={handleGoBack}>Back</button>
          </div>
          <div>
            <figure>
              <img src={Pullups} alt="pullups image" />
              <figcaption>
                <h4 className="titles">{selectedWorkout}</h4>
                <h5>{`${sessionDuration}-${sessionDuration + 15}min`}</h5>
              </figcaption>
            </figure>
          </div>
          <h4>Plan Info</h4>
          <div className="workoutinfo">
            <h5 className="title">{selectedWorkout}</h5>
            <div className="par">
              <div className="par-item">{`${workoutsPerWeek} days per week`}</div>
              <div className="par-item">{`${sessionDuration} mins per day`}</div>
            </div>
            <hr />
            <p className="workout_description">
              A beginner routine with {workoutsPerWeek} days a week of lifting and a focus on
              barbell lifts. Lift hard and most importantly rest well too!
            </p>
            <button className="edit" onClick={handleEdit}>
              Edit
            </button>
          </div>
        </div>
        <div className="leftside"></div>
      </div>

      {isEditing && (
        <div className="workout-modal">
          <h2>Edit Workout Details</h2>
          <h2>Select Workout Type</h2>
          <button onClick={() => handleWorkoutSelect("Push-Pull-Legs")}>
            Push-Pull-Legs
          </button>
          <button onClick={() => handleWorkoutSelect("Other Workout Type")}>
            Other Workout Type
          </button>
          <label>
            Workouts Per Week:
            <input
              type="number"
              value={workoutsPerWeek}
              onChange={(e) => setWorkoutsPerWeek(parseInt(e.target.value))}
            />
          </label>
          <label>
            Session Duration (minutes):
            <input
              type="number"
              value={sessionDuration}
              onChange={(e) => setSessionDuration(parseInt(e.target.value))}
            />
          </label>
          {/* You can include workout type selection here if needed */}
          <button onClick={handleSaveChanges}>Save Changes</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default Myworkouts;
