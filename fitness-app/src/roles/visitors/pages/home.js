import React from "react";
import "../styling/home.css";
import dumbbellImage from "../assets/dumbbell.png";

function Home() {
  return (
    <div className="image">
      <div className="header">
        <h1>
          WORKOUT LIKE <br />A <span className="champion">CHAMPION</span>
        </h1>
      </div>
      <div className="features">
        <div className="items">
          <img src="{dumbbellImage}"></img>
          <div className="items">Workout</div>
        </div>
        <div className="items">
          <img src="{}"></img>
          <div className="items">Lessons</div>
        </div>
        <div className="items">
          <img src="{}"></img>
          <div className="items">Progress</div>
        </div>
      </div>
      <div className="info">
        <h2>HOW TO GET STARTED?</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipiscing elit senectus,
          viverra cubilia aliquet pretium lobortis faucibus etiam et ultrices,
          lacinia placerat condimentum elementum volutpat torquent suspendisse.
          Taciti vivamus quisque feugiat aliquet iaculis justo cum, at magnis
          scelerisque etiam eros sodales, pellentesqu Taciti vivamus quisque
          feugiat aliquet iaculis justo cum, at magnis scelerisque etiam eros
          sodales, pellentesqu
        </p>
        <button onclick="location.href = 'www.youtube.com'">SIGN UP</button>
      </div>
    </div>
  );
}

export default Home;
