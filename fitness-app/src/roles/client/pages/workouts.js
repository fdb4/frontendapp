import React, { useState, useEffect } from "react";
import ClientNavbar from "../../../components/navbar-visitor/clientnav";
import "../styling/workout.css";
import Cardio from "../../../roles/visitors/assets/cardio.png";
import Videos from "../../workouts/videos.js";
import {Link} from "react-router-dom";


function Workouts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredVideos, setFilteredVideos] = useState([]);

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  useEffect(() => {
    setFilteredVideos(<Videos searchQuery={searchQuery} />);
  }, [searchQuery]);

  return (
    <div className="body_1">
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
      <img src={Cardio} />
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
        {filteredVideos}
      </div>
    </main>
  </div>
  );
}

export default Workouts;
