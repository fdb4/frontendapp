import React from "react";
import ClientNavbar from "../../../../components/navbar-visitor/clientnav";
import { useNavigate } from "react-router-dom"; 

function Myworkouts() {
    const navigate = useNavigate();
    const handleGoBack = () => {
        // Go back to the previous page in the history
        navigate(-1);
      };

  return (
    <div className="body">
      <ClientNavbar/>
      <div className="individual">
        <div className="rightside">
          <h1>My Workout</h1>
          <button onClick={handleGoBack}>Back</button>
          <div>
           <figure>
                <img></img>
                <figcatption>
                    <h4>PULL WORKOUT</h4>
                    <h5>45-60min</h5>
                </figcatption>
                <span>
                    <button>
                        <span>
                            button
                        </span>
                    </button>
                </span>
           </figure>
            
          </div>
          <h4>Plan Info</h4>
          <div>

          </div>
        </div>
        <div className="leftside">

        </div>
      </div>


      {/* <div clasName="coach_recommendation">

      </div> */}
    </div>
  );
}

export default Myworkouts;
