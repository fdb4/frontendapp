import React, { useState, useEffect } from "react";
import "./styling/video.css";

function Videos({ searchQuery,  selectedEquipment }) {
  const [workouts, setWorkouts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [goToPage, setGoToPage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/workouts")
      .then((response) => response.json())
      .then((data) => {
        setWorkouts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching workouts:", error);
        setLoading(false);
      });
  }, []);

  const workoutsPerPage = 6; // Change this to 6 for 6 videos per page
  const startIndex = (currentPage - 1) * workoutsPerPage;
  const endIndex = startIndex + workoutsPerPage;

  if (loading) {
    return <p>Loading workouts...</p>;
  }

  if (!workouts || workouts.length === 0) {
    return <p>No workouts available.</p>;
  }

  const filteredWorkouts = workouts.filter((workout) =>
  workout.workoutname.toLowerCase().includes(searchQuery.toLowerCase()) &&
  (selectedEquipment ? workout.equipment === selectedEquipment : true)
);
  const paginatedWorkouts = filteredWorkouts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredWorkouts.length / workoutsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setGoToPage("");
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const handleGoToPage = () => {
    const pageNumber = parseInt(goToPage, 10);
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
      handlePageChange(pageNumber);
    }
  };

  return (
    <div className="video-container">
      {paginatedWorkouts.map((workout, index) => (
        <div key={index} className="video-item">
          <iframe
            title={workout.workoutname}
            width="320"
            height="200"
            src={`${workout.videolink}?modestbranding=1&rel=0`}
            allowFullScreen
          ></iframe>
          <h3>{workout.workoutname}</h3>
          <h3>{workout.musclegroup}</h3>
          <h3>{workout.equipment}</h3>
        </div>
      ))}
      <div className="pagination">
        <button onClick={handlePreviousPage}>&lt; Previous</button>
        <span>
          Page {currentPage} of {totalPages} | Total Workouts: {filteredWorkouts.length}
        </span>
        <span>
          Go to Page:
          <input
            type="number"
            value={goToPage}
            onChange={(e) => setGoToPage(e.target.value)}
          />
          <button onClick={handleGoToPage}>Go</button>
        </span>
        <button onClick={handleNextPage}>Next &gt;</button>
      </div>
    </div>
  );
}

export default Videos;
