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
          <h1>My Workout</h1>
          <button onClick={handleGoBack}>Back</button>
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
          <div></div>
        </div>
        <div className="leftside"></div>
      </div>

      {/* <div clasName="coach_recommendation">

      </div> */}
    </div>
  );
}

export default Myworkouts;
