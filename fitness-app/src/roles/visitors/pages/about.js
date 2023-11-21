import React from "react";
import "../styling/about.css";
import facebook from "../assets/facebook.png"
import linkedin  from "../assets/linkedin.png";
import instagram from "../assets/instagram.png"
import VisitorNavbar from "../../../components/navbar-visitor/visitornav";

function About() {
  return (
    <div className="body">
      <VisitorNavbar />
      <div className="header-container">
        <h1>Meet Our Team of Creators, Designers, and Problem Solvers</h1>
        <p id="para">
          This app has been designed by a group of passionate software
          engineers. Get to know the people leading the way. This is the second
          line. And this is the third line.
        </p>
      </div>
      <div className="team-container">
        <div className="team">
          <h2>Gianna Bauzil</h2>
          <p>Team-Lead</p>
        </div>
        <div className="team">
          <h2>Samin Chowdhury</h2>
          <p>Back-End</p>
        </div>
        <div className="team">
          <h2>Francesco</h2>
          <p>Back-End</p>
        </div>
        <div className="team">
          <h2>Fahad Ali</h2>
          <p>Front-End</p>
        </div>
        <div className="team">
          <h2>Sandeep Singh</h2>
          <p>Front-End</p>
        </div>
        <div className="team">
          <h2>Casey Tirell</h2>
          <p>Front-End</p>
        </div>
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

export default About;
