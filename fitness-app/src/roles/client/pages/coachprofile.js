// CoachProfile.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CoachProfile = () => {
  const { id } = useParams();
  const [coach, setCoach] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/coaches/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setCoach(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      }
    };

    fetchData();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!coach) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Coach Profile</h1>
      {/* Render coach details here */}
      {/* You can use a similar structure as in your ClientCoaches component */}
    </div>
  );
};

export default CoachProfile;
