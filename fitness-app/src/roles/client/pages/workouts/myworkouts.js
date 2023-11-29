import React from "react";
import ClientNavbar from "../../../../components/navbar-visitor/clientnav";
import { useNavigate } from "react-router-dom";
import "../../styling/myworkouts.css";
import Pullups from "../../../visitors/assets/pullup.jpg";

function Myworkouts() {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate("/workouts");
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
                <h4 className="titles">PULL WORKOUT</h4>
                <h5>45-60min</h5>
              </figcaption>
            </figure>
          </div>
          <h4>Plan Info</h4>
          <div className="workoutinfo">
            <h5 className="title">Push-Pull-Legs</h5>
            <div className="par">
              <div className="par-item">6 days per week</div>
              <div className="par-item">66-70 mins per day</div>
            </div>
            <hr /> 
            <p className="workout_description">
              A beginner routine with six days a week of lifting and a focus on
              barbell lifts. Two lower body workouts, two pul workouts, and two
              push workouts per day. The routine is very popular.
            </p>
            <button className="edit">Edit</button>
          </div>    
        </div>
        <div className="leftside"></div>

      </div>
      {/* <div clasName="coach_recommendation">

      </div> */}
    </div>
  );
}

export default Myworkouts;
