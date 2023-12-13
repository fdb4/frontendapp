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
        <div style={styles.profile}>
          <div style={styles.left_profile}>
            <div style={styles.name}>{workout.workoutname}</div>
            <div style={styles.name}>Muscle Group: {workout.musclegroup}</div>
            <div style={styles.name}>Equipment: {workout.equipment}</div>
            <button
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
            <div style={styles.name}>Description: {workout.description} </div>
          </div>
          <div style={styles.left_profile}></div>
        </div>
      </tr>
    );
  }

  return (
    <div className="body_1">
      <ClientNavbar />
      <div>
        <button onClick={handleAddWorkoutClick}>Add Workout</button>
        {showAddSuccess && (
          <MessagePopup message={`Workout Added Successful!`} />
        )}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setModalOpen(false)}
          contentLabel="Add Workout Modal"
          className="modal-content"
          overlayClassName="modal-overlay"
        >
          <button className="close-button" onClick={handleCloseModal}>
            ×
          </button>
          <br />
          <br />
          <form onSubmit={addWorkout}>
            <label>
              Workout Name:
              <input
                type="text"
                name="workoutname"
                value={formData.workoutname}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Video Link:
              <input
                type="url"
                name="videolink"
                value={formData.videolink}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Description:
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Muscle Group:
              <input
                type="text"
                name="musclegroup"
                value={formData.musclegroup}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Equipment:
              <input
                type="text"
                name="equipment"
                value={formData.equipment}
                onChange={handleInputChange}
                required
              />
            </label>

            <button type="submit">Submit</button>
          </form>
        </Modal>
      </div>

      <div style={styles.all_workouts}>
        <div id="activeworkout" style={styles.workoutsection}>
          Active Workouts:
          {activeWorkout.map((workout) => (
            <DisplayWorkout workout={workout} type={"Deactivate"} />
          ))}
        </div>

        <div id="deactiveworkout" style={styles.workoutsection}>
          Deactive Workouts:
          {deactiveWorkout.map((workout) => (
            <DisplayWorkout workout={workout} type={"Activate"} />
          ))}
        </div>
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
    fontFamily: "Saira Condensed, sans-serif",
    fontSize: "12px",
    fontWeight: "700",
    lineHeight: "1.5",
    paddingTop: "10px",
    alignItems: "center",
    justifyContent: "center",
  },
};
export default AdminWorkouts;
