import React, { useState, useEffect } from "react";
import ClientNavbar from "../../../components/navbar-visitor/clientnav.js";
import VisitorNavbar from "../../../components/navbar-visitor/visitornav.js";
import "../styling/workout.css";
import Cardio from "../../../roles/visitors/assets/cardio.png";
import { Link } from "react-router-dom";
import Videos from "../../workouts/videos.js";
import { useAuth } from "../../../components/navbar-visitor/auth.js"

function Workouts() {
  const { auth } = useAuth()
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
    let url = "http://localhost:5000/workouts";

    if (searchQuery) {
      url += `/search/${searchQuery}`;
    }

    if (selectedEquipment) {
      url += `/filter/equipment/${selectedEquipment}`;
    }

    if (selectedMuscleGroup) {
      url += `/filter/musclegroup/${selectedMuscleGroup}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched video data:", data);
        setFilteredVideos(data);
      })
      .catch((error) => console.error("Error fetching videos:", error));
  }, [searchQuery, selectedEquipment, selectedMuscleGroup]);

  const commonEquipmentOptions = [
    "Bodyweight", "Barbell", "Dumbbells", "Cable Machine", "Bicycle",
    "Jump Rope", "Incline Bench", "Pull-up Bar", "Stairs",
    "Yoga Mat", "Exercise Mat", "Foam Roller",
  ];

  return (
    <div className="body">
        {auth.id ? (
          <ClientNavbar />
      ) : (
        <VisitorNavbar />
      )}
      <header className="heading">
        <div className="header_2">
          <div className="title">
            <h1>WORKOUTS</h1>
            <h2>CARDIO</h2>
          </div>

          <p>
            Make the most of your workouts. Try some cardio and burn some fat.
            Or if you want you can check out some of the more popular options.
            Try anything but be consistent!
          </p>
          <Link to="/my-workouts">
            <button className="green">My Workout</button>
          </Link>
          <button className="red">Preview</button>
        </div>
        <img src={Cardio} alt="Cardio" />
      </header>
      <main>
        <div className="nav_2">
          <h2>Popular Exercise</h2>
          <div className="search-container">
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

<<<<<<< HEAD:fitness-app/src/roles/client/pages/workouts.js
          <Videos searchQuery={searchQuery} selectedEquipment={selectedEquipment} />
=======
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
>>>>>>> 851ac82a3ba0d040f139587f1164d45cd050efa2:fitness-app/src/roles/visitors/pages/workouts.js

        </div>
        <Videos
          searchQuery={searchQuery}
          selectedEquipment={selectedEquipment}
          selectedMuscleGroup = {selectedMuscleGroup}

        />
      </main>
    </div>
  );
}

export default Workouts;
