import React from "react";
import "../styling/services.css";
import image from "../assets/image_1.jpg";
import image_2 from "../assets/image_2.jpg";
import facebook from "../assets/facebook.png";
import linkedin from "../assets/linkedin.png";
import instagram from "../assets/instagram.png";
import VisitorNavbar from "../../../components/navbar-visitor/visitornav";

function Services() {
  return (
    <div className="body">
     <VisitorNavbar />
      <div className="title-container">
        <h1 className="title">SERVICES</h1>
      </div>
      <div className="item">
        <h2>TRACK DAILY INTAKE</h2>
        <div className="paragraphs-container">
          <p>
            We offer a variety of features for our clients, including tracking
            daily intake, hiring a coach, and talking with them. An online diary
            to keep track of your workouts and log them and many more.
          </p>
          <p>
            Make sure to stay hydrated and well-nutritioned. After all, we don't
            want you to be malnourished when you use up all your energy at the
            gym.
          </p>
        </div>
      </div>
      <div className="item_2">
        <img src={image} alt="Two people running and working out" />
        <div className="middle">
          <h2>Fit-Camp</h2>
          <p>
            Our youth strength & conditioning program focuses on getting you
            stronger and healthier for life. We offer a variety of workouts and
            options to suit your needs.
          </p>
        </div>
      </div>
      <div className="item_3">
        <p>
          If you want someone to oversee your workout journey, then worry not!
          We have added a feature to allow you to hire a coach and at the
          comfort of using this app. All you need to do is sign up right now and
          start working out with a professional.
        </p>
        <h2>Hire Coaches</h2>
        <img
          className="images"
          src={image_2}
          alt="Gym folks posing for a picture"
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

export default Services;
