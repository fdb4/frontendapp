import React, { useState, useEffect } from "react";
import ClientNavbar from "../../../components/navbar-visitor/clientnav";
import "../styling/workout.css";
import Cardio from "../../../roles/visitors/assets/cardio.png";
import { Link } from "react-router-dom";
import Videos from "../../workouts/videos.js";

function Workouts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEquipment, setSelectedEquipment] = useState("");
  const [filteredVideos, setFilteredVideos] = useState([]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleEquipmentChange = (event) => {
    setSelectedEquipment(event.target.value);
  };

  useEffect(() => {
    // Fetch videos from the backend API based on searchQuery and selectedEquipment
    let url = "http://localhost:5000/workouts";

    // Append searchQuery to the URL if present
    if (searchQuery) {
      url += `/search/${searchQuery}`;
    }

    // Append selectedEquipment to the URL if present
    if (selectedEquipment) {
      url += `/filter/equipment/${selectedEquipment}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched video data:", data);
        setFilteredVideos(data);
      })
      .catch((error) => console.error("Error fetching videos:", error));
  }, [searchQuery, selectedEquipment]);

  const commonEquipmentOptions = [
    "Bodyweight", "Barbell", "Dumbbells", "Cable Machine", "Bicycle",
    "Jump Rope", "Bench", "Pull-up Bar", "Stairs or Stair Climber Machine",
    "Yoga Mat", "Exercise Mat", "Foam Roller",
  ];

  return (
    <div className="body">
      <ClientNavbar />
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
          <div className="search-container">
            <h2>Popular Exercise</h2>
            <input
              className="searchbox"
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>

          <div className="equipment-filter">
            <label htmlFor="equipment">Filter by Equipment:</label>
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

          <Videos searchQuery={searchQuery} selectedEquipment={selectedEquipment} />

        </div>
      </main>
    </div>
  );
}

export default Workouts;
