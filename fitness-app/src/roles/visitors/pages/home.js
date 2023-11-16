import React from "react";
import "../styling/home.css";
import dumbbellImage from "../assets/dumbbell.png";
import timer from "../assets/timer.png";
import scheduler from "../assets/schedule.png";
import facebook from "../assets/facebook.png";
import linkedin from "../assets/linkedin.png";
import instagram from "../assets/instagram.png";
import VisitorNavbar from "../../../components/navbar-visitor/visitornav";

function Home() {
  return (
    <div className="image">
      <VisitorNavbar />
      <div className="header">
        <h1>
          WORKOUT LIKE <br />A <span className="champion">CHAMPION</span>
        </h1>
      </div>
      <div className="features">
        <div className="items">
          <img src={dumbbellImage} alt="Dumbbell" />
          <div className="items">Workout</div>
        </div>
        <div className="items">
          <img src={timer} alt="Timer" />
          <div className="items">Progress</div>
        </div>
        <div className="items">
          <img src={scheduler} alt="Your Image" />
          <div className="items">Lessons</div>
        </div>
      </div>
      <div className="info">
        <h2 className="header_two">HOW TO GET STARTED?</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipiscing elit senectus,
          viverra cubilia aliquet pretium lobortis faucibus etiam et ultrices,
          lacinia placerat condimentum elementum volutpat torquent suspendisse.
          Taciti vivamus quisque feugiat aliquet iaculis justo cum, at magnis
          scelerisque etiam eros sodales, pellentesqu Taciti vivamus quisque
          feugiat aliquet iaculis justo cum, at magnis scelerisque etiam eros
          sodales, pellentesqu
        </p>
        <button onClick={() => (window.location.href = "/registration")}>
          SIGN UP
        </button>
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

export default Home;
