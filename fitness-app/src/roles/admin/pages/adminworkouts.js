import React from "react";
import ClientNavbar from "../../../components/navbar-visitor/clientnav";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Coach from "../../visitors/assets/coach.png";
import Modal from "react-modal";
import "../styling/modal.css";
import MessagePopup from "../../../components/navbar-visitor/MessagePopup";
import API_URL from "../../../components/navbar-visitor/apiConfig";

const AdminWorkouts = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showAddSuccess, setShowAddSuccess] = useState(false);
  const [activeWorkout, setActiveWorkout] = useState([]);
  const [deactiveWorkout, setDeactiveWorkout] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    workoutname: "",
    videolink: "",
    description: "",
    musclegroup: "",
    equipment: "",
  });

  const ITEMS_PER_PAGE = 5;

  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastActive = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstActive = indexOfLastActive - ITEMS_PER_PAGE;
  const currentActiveWorkouts = activeWorkout.slice(
    indexOfFirstActive,
    indexOfLastActive
  );

  const indexOfLastDeactive = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstDeactive = indexOfLastDeactive - ITEMS_PER_PAGE;
  const currentDeactiveWorkouts = deactiveWorkout.slice(
    indexOfFirstDeactive,
    indexOfLastDeactive
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/workouts`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        setActiveWorkout(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      try {
        const response = await fetch(`${API_URL}/workouts/deactivated`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        setDeactiveWorkout(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDeactivate = async (workout) => {
    console.log(workout.workoutID);
    const dataToSend = {
      // Your data to be sent to the backend
      workoutID: workout.workoutID,
      visible: 0,
    };
    try {
      const response = await fetch(`${API_URL}/workouts/visibility`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      // window.location.reload();
      // alert("Workout Deactivated");
      setShowSuccess(true);
      console.log(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleActivate = async (workout) => {
    console.log(workout.workoutID);
    const dataToSend = {
      // Your data to be sent to the backend
      workoutID: workout.workoutID,
      visible: 1,
    };
    try {
      const response = await fetch(`${API_URL}/workouts/visibility`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      // window.location.reload();
      // alert("Workout Activated");
      setShowSuccess(true);
      console.log(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAddWorkoutClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const addWorkout = async (event) => {
    event.preventDefault();

    try {
      // Perform the POST request to your backend API
      const response = await fetch(`${API_URL}/workout/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add any other headers as needed
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Handle the response data if needed
      const responseData = await response.json();
      console.log("Data successfully submitted:", responseData);
      // window.location.reload();
      // alert("Added Workout");
      setShowAddSuccess(true);

      // Close the modal after successful submission
      setModalOpen(false);
    } catch (error) {
      console.error("Error submitting data:", error);
      alert(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  function DisplayWorkout({ workout, type }) {
    return (
      <tr key={workout.workoutID}>
        <td>
          <div style={styles.workoutCard}>
            <div style={styles.workoutDetails}>
              <div style={styles.workoutName}>{workout.workoutname}</div>
              <div style={styles.detail}>Muscle Group: {workout.musclegroup}</div>
              <div style={styles.detail}>Equipment: {workout.equipment}</div>
              <button
                style={type === "Deactivate" ? styles.deactivateButton : styles.activateButton}
                onClick={() => {
                  if (type === "Deactivate") return handleDeactivate(workout);
                  return handleActivate(workout);
                }}
              >
                {type}
              </button>
              {showSuccess && <MessagePopup message={`Successful!`} />}
            </div>
            <div style={styles.description}>
              <div style={styles.detail}>Description: {workout.description}</div>
            </div>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <div className="aw-workout-container">
      <ClientNavbar />
      <div className="aw-workout-actions">
        <button className="aw-add-workout-btn" onClick={handleAddWorkoutClick}>Add Workout</button>
        {showAddSuccess && (
          <MessagePopup className="aw-success-message" message={`Workout Added Successful!`} />
        )}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setModalOpen(false)}
          contentLabel="Add Workout Modal"
          className="aw-add-workout-modal"
          overlayClassName="modal-overlay"
        >
          <button className="aw-modal-close-btn" onClick={handleCloseModal}>×</button>
          <br /><br />
          <form className="aw-workout-form" onSubmit={addWorkout}>
            <div className="aw-form-group">
              <label style ={{ fontSize: '18px', fontFamily: 'Copperplate, Papyrus, fantasy', color: 'white' }} className="workout-label">
                Workout Name:
                <input
                  className="aw-workout-input"
                  type="text"
                  name="workoutname"
                  value={formData.workoutname}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>
            <div className="aw-form-group">
              <label style ={{ fontSize: '18px', fontFamily: 'Copperplate, Papyrus, fantasy', color: 'white' }} className="workout-label">
                Video Link:
                <input
                  className="aw-workout-input"
                  type="url"
                  name="videolink"
                  value={formData.videolink}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>
            <div className="aw-form-group">
              <label style ={{ fontSize: '18px', fontFamily: 'Copperplate, Papyrus, fantasy', color: 'white' }} className="workout-label">
                Description:
                <input
                  className="aw-workout-input"
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>
            <div className="aw-form-group">
              <label style ={{ fontSize: '18px', fontFamily: 'Copperplate, Papyrus, fantasy', color: 'white' }} className="workout-label">
                Muscle Group:
                <input
                  className="aw-workout-input"
                  type="text"
                  name="musclegroup"
                  value={formData.musclegroup}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>
            <div className="aw-form-group">
              <label style ={{ fontSize: '18px', fontFamily: 'Copperplate, Papyrus, fantasy', color: 'white' }} className="workout-label">
              Equipment:
              <input
                className="aw-workout-input"
                type="text"
                name="equipment"
                value={formData.equipment}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>
          <button className="aw-submit-workout-btn" type="submit">Submit</button>
        </form>
      </Modal>
    </div>
    <div className="aw-workout-listings">
      <div id="activeWorkoutSection" className="aw-workout-section">
        <p className="aw-section-title" style={{ marginLeft: '50px', fontFamily: 'Copperplate, Papyrus, fantasy', color: "white" }}> Active Workouts:</p>
        {currentActiveWorkouts.map((workout) => (
          <DisplayWorkout
            className="aw-workout-display"
            workout={workout}
            type={"Deactivate"}
            key={workout.workoutID}
            deactivateButtonClass="deactivate-button"
          />
        ))}
      </div>
      <div id="deactiveWorkoutSection" className="aw-workout-section">
        <p className="aw-section-title" style={{ marginLeft: '50px', fontFamily: 'Copperplate, Papyrus, fantasy', color: "white " }}>Deactive Workouts:</p>
        {currentDeactiveWorkouts.map((workout) => (
          <DisplayWorkout
            className="aw-workout-display"
            workout={workout}
            type={"Activate"}
            key={workout.workoutID}
          />
        ))}
      </div>
    </div>
    <div className="aw-pagination-controls" style={{ textAlign: "center" }}>
      <button
        className="aw-pagination-btn previous"
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous Page
      </button>
      <span className="aw-current-page-indicator" style={{ color: 'white', margin: "0 10px" }}>Page {currentPage}</span>
      <button
        className="aw-pagination-btn next"
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={
          currentPage * ITEMS_PER_PAGE >= activeWorkout.length &&
          currentPage * ITEMS_PER_PAGE >= deactiveWorkout.length
        }
      >
        Next Page
      </button>
    </div>
  </div>
  );
};
const styles = {
  all_workouts: {
    padding: "10px",
    display: "flex",
    flexDirection: "row",
  },
  workoutsection: {
    flex: 1,
    background: "black",
    padding: "10px",
    margin: "5px",
    display: "flex",
    flexDirection: "column",
  },
  profile: {
    flex: 1,
    margin: "20px",
    borderRadius: "10px",
    background: "#d9d9d9",
    display: "flex",
  },
  left_profile: {
    flex: 1,
  },
  description: {
    flex: 10,
  },
  name: {
    color: "#000",
    fontFamily: "Copperplate, Papyrus, fantasy",
    fontSize: "12px",
    fontWeight: "700",
    lineHeight: "1.5",
    paddingTop: "10px",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "20px"
  },
  workoutCard: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    margin: "10px",
    background: "#f4f4f4",
    borderRadius: "10px",
  },
  workoutDetails: {
    flex: 1,
    textAlign: "left",
  },
  workoutName: {
    color: "#000",
    fontFamily: "Copperplate, Papyrus, fantasy",
    fontSize: "18px",
    fontWeight: "700",
    textDecoration: "underline"
  },
  detail: {
    color: "#000",
    fontFamily: "Arial, sans-serif",
    fontSize: "14px",
    margin: "5px 0",
  },
  description: {
    flex: 2,
    textAlign: "left",
    marginLeft: "20px",
  },
  deactivateButton: {
    backgroundColor: "red",
    color: "white",
  },
  activateButton: {
    backgroundColor: "green",
    color: "white",
  },
};
export default AdminWorkouts;
