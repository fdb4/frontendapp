import React, { useState, useEffect } from "react";
import ClientNavbar from "../../../../components/navbar-visitor/clientnav.js";
import VisitorNavbar from "../../../../components/navbar-visitor/visitornav.js";
import "./styling/workout.css";
import Cardio from "./images/cardio.png";
import { Link } from "react-router-dom";
import Videos from "./videos.js";
import { useAuth } from "../../../../components/navbar-visitor/auth.js";
import API_URL from "../../../../components/navbar-visitor/apiConfig.js";

function Workouts() {
  const { auth } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEquipment, setSelectedEquipment] = useState("");
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState("");
  const [filteredVideos, setFilteredVideos] = useState([]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleEquipmentChange = (event) => {
    setSelectedEquipment(event.target.value);
  };

  const handleMuscleGroupChange = (event) => {
    setSelectedMuscleGroup(event.target.value);
  };

  useEffect(() => {
    let url = `${API_URL}/workouts`;

    if (searchQuery) {
      url += `/filter/name/${searchQuery}`;
      setSelectedEquipment("");
      setSelectedMuscleGroup("");
    }

    if (selectedEquipment) {
      url += `/filter/equipment/${selectedEquipment}`;
      setSearchQuery("");
      setSelectedMuscleGroup("");
    }

    if (selectedMuscleGroup) {
      url += `/filter/musclegroup/${selectedMuscleGroup}`;
      setSelectedEquipment("");
      setSearchQuery("");
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched video data:", data);
        setFilteredVideos(data);
        console.log(data);
      })
      .catch((error) => console.error("Error fetching videos:", error));
  }, [searchQuery, selectedEquipment, selectedMuscleGroup]);

  const commonEquipmentOptions = [
    "Bodyweight",
    "Barbell",
    "Dumbbells",
    "Cable Machine",
    "Bicycle",
    "Jump Rope",
    "Incline Bench",
    "Pull-up Bar",
    "Stairs",
    "Yoga Mat",
    "Exercise Mat",
    "Foam Roller",
  ];

  return (
    <div className="body_1">
      {auth.id ? <ClientNavbar /> : <VisitorNavbar />}
      <header className="heading">
        <div className="header_2">
          <div className="title">
            <h1 style={{ marginBottom: "30px" }}>WORKOUTS</h1>
            <p>
              Welcome to the workouts page, check out the workout bank and then
              create your own personalized workout to log against!
            </p>
          </div>

          <Link to="/my-workouts">
            <button className="green">My Workout</button>
          </Link>
          <Link to="/preview">
            <button className="red">Preview</button>
          </Link>
        </div>
        <img src={Cardio} alt="Cardio" />
      </header>
      <main>
        <div className="nav_2">
          <h2>Our Exercises:</h2>
          <div className="search-container" style={{ marginRight: "50px" }}>
            <input
              className="searchbox"
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>

          <div className="equipment-filter">
            <label htmlFor="equipment"></label>
            <select
              id="equipment"
              value={selectedEquipment}
              onChange={handleEquipmentChange}
            >
              <option value="">All Equipment</option>
              {commonEquipmentOptions.map((equipment) => (
                <option key={equipment} value={equipment}>
                  {equipment}
                </option>
              ))}
            </select>
          </div>

          <div className="muscle-group-filter">
            <label htmlFor="muscleGroup"></label>
            <select
              id="muscleGroup"
              value={selectedMuscleGroup}
              onChange={handleMuscleGroupChange}
            >
              <option value="">All Muscle Groups</option>
              <option value="Chest">Chest</option>
              <option value="Back">Back</option>
              <option value="Shoulders">Shoulders</option>
              <option value="Arms">Arms</option>
              <option value="legs">Legs</option>
              <option value="core">Core</option>
              <option value="glutes, hamstrings">Glutes</option>
              <option value="fullbody">Fullbody</option>
            </select>
          </div>
        </div>
        <Videos filtered={filteredVideos} />
      </main>
    </div>
  );
}

export default Workouts;
