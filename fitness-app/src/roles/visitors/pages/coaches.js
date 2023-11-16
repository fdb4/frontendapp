import React from "react";
import "../styling/coaches.css";
import deadlift from "../assets/deadlift.jpg";
import trainer from "../assets/trainer.jpg";
import facebook from "../assets/facebook.png";
import linkedin from "../assets/linkedin.png";
import instagram from "../assets/instagram.png";
import VisitorNavbar from "../../../components/navbar-visitor/visitornav";

function Coaches() {
  return (
    <div className="body_1">
      <VisitorNavbar />
      <div className="header_1">
        <h2 className="coaches">Coaches</h2>
        <h1>Train with Experts</h1>
      </div>
      <img
        src={trainer}
        className="images_1"
        alt="Three people crossing thier hands and standing in a gym."
      />
      <div className="information">
        <div>
          <h2>
            VIEW A LIST OF EXPERTS OR <br></br>
            <span className="become">BECOME</span> ONE YOURSELF
          </h2>
          <p className="paragraph">
            The GYM’s team-based care service model offers many potential
            advantages, including expanded access to training. More trainers not
            only mean more appointment slots, shorter wait times, and greater
            availability, but it’ll also make you feel more supported in working
            towards your wellness goals and help you stay consistent.
          </p>
        </div>
        <img
          src={deadlift}
          className="images_2"
          alt="Photof of man gettgin ready to deadlift."
        />
      </div>
      <div className="footer">
        <h2>
          READY FOR YOUR <br></br>
          <span className="champion">FIRST</span> LESSON?
        </h2>
        <div className="socials">
          <img src={facebook} alt="Dumbbell" />
          <img src={linkedin} alt="linkedin" />
          <img src={instagram} alt="instagram" />
        </div>
        <div className="concerns">
          <p>info@yourdomain.com</p>
          <p>Privacy Policy</p>
          <p>Terms & Conditions</p>
        </div>
      </div>
    </div>
  );
}

export default Coaches;
