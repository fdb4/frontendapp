import React, { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ClientNavbar from "../../../components/navbar-visitor/clientnav";
import "../styling/clientprofile.css";
import Coach from "../../visitors/assets/coach.png";
import { Link } from "react-router-dom";
// import "../styling/confirmationmodal.css"
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import axios from "axios";
import Cookies from "js-cookie";
import API_URL from "../../../components/navbar-visitor/apiConfig";
import MessagePopup from "../../../components/navbar-visitor/MessagePopup";

const ClientProfile = () => {
  const clientID = Cookies.get("id");
  const currentClientID = Cookies.get("currentClientID");

  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [messageContent, setMessageContent] = useState("");
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [showWorkoutForm, setShowWorkoutForm] = useState(false);
  const [workoutPlan, setWorkoutPlan] = useState({
    planName: "",
    clientID: currentClientID,
    selectedExercises: [],
  });
  const [allExercises, setAllExercises] = useState([]);
  const [limitReachedMessage, setLimitReachedMessage] = useState("");
  const requestData = {
    clientID: clientID,
    coachID: id,
  };
  const [dailyLog, setDailyLog] = useState([]);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [workoutLogs, setWorkoutLogs] = useState([]);
  const [expandedLog, setExpandedLog] = useState(null);
  const [expandedPlan, setExpandedPlan] = useState(null);

  const mapMood = (value) => {
    const smiles = ["😟", "😕", "😐", "🙂", "😀"];
    return smiles[Math.min(Math.max(Math.round(value), 1), 5) - 1];
  };

  const [calGraphData, setCalGraphData] = useState({
    labels: [],
    datasets: [
      {
        label: "Weekly Calorie Intake",
        data: [],
        borderColor: "rgb(167, 80, 62)",
        backgroundColor: "rgb(255, 255, 255)",
      },
    ],
  });

  const [waterGraphData, setWaterGraphData] = useState({
    labels: [],
    datasets: [
      {
        label: "Weekly Water Intake",
        data: [],
        borderColor: "rgb(167, 80, 62)",
        backgroundColor: "rgb(255, 255, 255)",
      },
    ],
  });

  const [moodGraphData, setMoodGraphData] = useState({
    labels: [],
    datasets: [
      {
        label: "Weekly Mood",
        data: [],
        borderColor: "rgb(167, 80, 62)",
        backgroundColor: "rgb(255, 255, 255)",
      },
    ],
  });

  const moodOptions = {
    scales: {
      y: {
        min: 1,
        max: 5,
        ticks: {
          stepSize: 1,
          autoskip: false,
          callback: function (value) {
            return mapMood(value);
          },
        },
      },
    },
  };

  const handleCreateWorkout = () => {
    setShowWorkoutForm(true);
  };

  const handleCancelCreateWorkout = () => {
    setShowWorkoutForm(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/clients/profile/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setClient(data[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      }
    };

    const fetchDailyLog = async () => {
      axios
        .get(`${API_URL}/dailyLog-data/${currentClientID}`)
        .then((response) => {
          console.log("Response: ", response.data);
          const data = response.data;

          const labels = data.map((entry) =>
            new Date(entry.date).toLocaleDateString()
          );
          const calData = data.map((entry) => entry.calorie);
          const waterData = data.map((entry) => entry.water);
          const moodData = data.map((entry) => entry.mood);

          setCalGraphData({
            labels,
            datasets: [
              {
                label: "Weekly Calorie Intake",
                data: calData,
                borderColor: "rgb(167, 80, 62)",
                backgroundColor: "rgba(255, 255, 255)",
              },
            ],
          });

          setWaterGraphData({
            labels,
            datasets: [
              {
                label: "Weekly Water Intake",
                data: waterData,
                borderColor: "rgb(167, 80, 62)",
                backgroundColor: "rgba(255, 255, 255)",
              },
            ],
          });

          setMoodGraphData({
            labels,
            datasets: [
              {
                label: "Weekly Mood",
                data: moodData,
                borderColor: "rgb(167, 80, 62)",
                backgroundColor: "rgba(255, 255, 255)",
              },
            ],
          });
        })
        .catch((error) => {
          if (error.response) {
            console.error("Error response:", error.response.data);
          } else if (error.request) {
            console.error("No response:", error.request);
          } else {
            console.error("Error", error.message);
          }
        });
    };

    const fetchExercises = async () => {
      try {
        const response = await fetch(`${API_URL}/workouts`);
        const exercise = await response.json();
        setAllExercises(exercise);
      } catch (error) {
        setError("Error fetching exercises. Please try again.");
      }
    };

    const fetchWorkoutLogs = async () => {
      try {
        const response = await fetch(
          `${API_URL}/workoutlogs/client/${currentClientID}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setWorkoutLogs(data);
      } catch (error) {
        console.error("Error fetching workout logs:", error);
      }
    };

    fetchData();
    fetchDailyLog();
    fetchExercises();
    fetchWorkoutLogs();
  }, [id]);

  const handleAddExercise = () => {
    // Check if the limit (10 exercises) has been reached
    if (workoutPlan.exercises.length < 10) {
      setWorkoutPlan((prev) => ({
        ...prev,
        exercises: [...prev.exercises, { workoutID: null, Sets: 0, reps: 0 }],
      }));
    } else {
      setLimitReachedMessage(
        "You've reached the limit of 10 exercises per session."
      );
    }
  };

  const handleDeleteExercise = (index) => {
    setLimitReachedMessage(""); // Clear the limitReachedMessage
    setWorkoutPlan((prev) => {
      const updatedExercises = [...prev.exercises];
      updatedExercises.splice(index, 1);
      return { ...prev, exercises: updatedExercises };
    });
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    setWorkoutPlan((prev) => {
      const updatedExercises = [...prev.exercises];
      updatedExercises[index][name] = value;
      return { ...prev, exercises: updatedExercises };
    });
  };

  const handleSessionNameChange = useCallback((event) => {
    setWorkoutPlan((prev) => ({ ...prev, sessionsName: event.target.value }));
  }, []);

  const heightConvert = (inches) => {
    const feet = Math.floor(inches / 12);
    const remainingInches = inches % 12;
    return `${feet}' ${remainingInches}"`;
  };

  const getGender = (binaryGender) => {
    return binaryGender === 0 ? "Male" : "Female";
  };

  const binConvert = (bin) => {
    return bin === 0 ? "No" : "Yes";
  };

  const handleGoBack = () => {
    // Go back to the previous page in the history
    navigate(-1);
  };

  const handleCreateWorkoutClick = () => {
    navigate(`/client-workout/${currentClientID}`);
  };

  const sendMessage = async () => {
    try {
      // Fetch URL for sending messages (replace with your actual API endpoint)
      // id = the clientID of person recieving the message
      const apiUrl = `${API_URL}/message/${id}`;

      // Fetch options for the POST request
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientID: Cookies.get("id"),
          message: messageContent,
        }),
      };
      // Send the POST request
      const response = await fetch(apiUrl, requestOptions);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Reset the message content after sending the message
      setMessageContent("");
      // Close the message form
      setShowMessageForm(false);
    } catch (error) {
      setShowMessageForm(false);
      alert("Message did not go through");
      console.error("Error sending message:", error);
    }
  };

  const handleOpenMessageForm = () => {
    // Open the message form
    setShowMessageForm(true);
  };

  const handleCloseMessageForm = () => {
    // Close the message form
    setShowMessageForm(false);
  };

  const SuccessNotification = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
      <div className="notification-modal">
        <div className="notification-content">
          <p>Workout Plan Successfully Created!</p>
          <button onClick={onClose}>OK</button>
        </div>
      </div>
    );
  };

  const WorkoutForm = React.memo(({ isOpen, onClose }) => {
    const [sessionName, setSessionName] = useState(
      workoutPlan.sessionsName || ""
    );
    if (!isOpen) {
      return null;
    }

    const handleSubmit = async (event) => {
      event.preventDefault();

      const payload = {
        planName: workoutPlan.sessionsName,
        clientID: workoutPlan.clientID,
        exercises: workoutPlan.selectedExercises.map((ex) => ({
          workoutID: ex.exerciseID,
          Sets: ex.sets,
          reps: ex.reps,
        })),
      };

      try {
        const response = await fetch(`${API_URL}/create/workoutplan/client`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          setShowSuccessNotification(true);
          setShowWorkoutForm(false);
          console.log("Workout Plan submitted:", workoutPlan);
          setShowWorkoutForm(false);
        } else {
          // Handle server error
          console.error("Failed to submit workout plan:", response.statusText);
        }
      } catch (error) {
        // Handle network error
        console.error("Network error:", error.message);
      }
    };

    return (
      <div className="lightbox">
        <div className="form-container">
          <span className="close" onClick={onClose}>
            &times;
          </span>
          <form onSubmit={handleSubmit}>
            <label htmlFor="sessionsName">Sessions Name:</label>
            <input
              type="text"
              id="sessionsName"
              name="sessionsName"
              value={workoutPlan.sessionsName}
              onChange={handleSessionNameChange}
            />
            {workoutPlan.selectedExercises.map((exercise, index) => (
              <div
                key={`exercise-${exercise.workoutID}-${index}`}
                className="exercise-form"
              >
                <label htmlFor={`exerciseID-${index}`}>Select Exercise:</label>
                <select
                  id={`exerciseID-${index}`}
                  name="exerciseID"
                  value={exercise.exerciseID || ""}
                  onChange={(event) => handleInputChange(index, event)}
                >
                  <option value="" disabled>
                    Select an Exercise
                  </option>
                  {allExercises.map((option) => (
                    <option key={option.workoutID} value={option.workoutID}>
                      {option.workoutname}
                    </option>
                  ))}
                </select>
                <p></p>
                <label htmlFor={`sets-${index}`}>Sets:</label>
                <input
                  type="number"
                  id={`sets-${index}`}
                  name="sets"
                  value={exercise.sets}
                  onChange={(event) => handleInputChange(index, event)}
                />
                <label htmlFor={`reps-${index}`}>Reps:</label>
                <input
                  type="number"
                  id={`reps-${index}`}
                  name="reps"
                  value={exercise.reps}
                  onChange={(event) => handleInputChange(index, event)}
                />
                <button
                  type="button"
                  onClick={() => handleDeleteExercise(index)}
                >
                  Delete Exercise
                </button>
              </div>
            ))}
            <button type="button" onClick={handleAddExercise}>
              Add Exercise
            </button>
            {limitReachedMessage && <p>{limitReachedMessage}</p>}
            {error && <p>{error}</p>}
            <div className="form-actions">
              <button type="submit">Submit Workout Plan</button>
              <button type="button" onClick={onClose}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  });

  function ConfirmationModal({ isOpen, onClose, onConfirm }) {
    if (!isOpen) {
      return null;
    }
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <div>Confirm: Send Coach Request</div>
          <button onClick={() => onConfirm()}>Yes</button>
          <button onClick={() => onClose()}>No</button>
        </div>
      </div>
    );
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCoachRequest = () => {
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/client/sendRequest`,
        requestData
      );
      //Handle the response data, if needed
      window.alert(response.data.message);
    } catch (error) {
      window.alert(`An error occurred: ${error.message}`);
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //Clients Sessions

  const [workouts, setWorkouts] = useState([]);
  const [groupedExercises, setGroupedExercises] = useState({});
  const [expandedWorkout, setExpandedWorkout] = useState(null);
  useEffect(() => {
    // Fetch workouts and group exercises when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/workoutplans/client/${id}`);
        const data = await response.json();
        setWorkouts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [clientID]);

  useEffect(() => {
    // Group exercises by workout name
    const groupExercisesByWorkoutName = () => {
      const groupedExercises = {};
      workouts.forEach((workout) => {
        const workoutName = workout.planName;
        if (!groupedExercises[workoutName]) {
          groupedExercises[workoutName] = [];
        }
        groupedExercises[workoutName].push(workout);
      });
      setGroupedExercises(groupedExercises);
    };

    groupExercisesByWorkoutName();
  }, [workouts]);

  const getWorkoutNameById = (workoutId) => {
    const workout = allExercises.find((entry) => entry.workoutID === workoutId);
    return workout ? workout.workoutname : "Workout not found";
  };

  const handleExpandToggle = (workoutName) => {
    handleEditClose();

    setExpandedWorkout((prevExpanded) =>
      prevExpanded === workoutName ? null : workoutName
    );
  };

  const [editMode, setEditMode] = useState(false);
  const handleEditMode = (workoutName) => {
    setEditMode(true);

    setWorkoutPlan((prev) => ({
      ...prev,
      planName: workoutName,
    }));
    groupedExercises[workoutName].forEach((exercise) => {
      setWorkoutPlan((prev) => ({
        ...prev,
        exercises: [
          ...(prev.exercises || []), // Ensure prev.exercises is an array
          {
            workoutID: exercise.workoutID,
            Sets: exercise.Sets,
            reps: exercise.reps,
          },
        ],
      }));
    });
  };

  const handleEditClose = () => {
    setEditMode(false);
    setWorkoutPlan({
      planName: "",
      clientID: clientID,
      exercises: [],
    });
  };

  const [showEditSuccess, setShowEditSuccess] = useState(false);
  const [showEditError, setShowEditError] = useState(false);
  const handleSubmitEdits = async (workoutName) => {
    const workoutplanID = groupedExercises[workoutName][0].workoutplanID;
    console.log(workoutplanID);
    console.log(workoutPlan);
    try {
      const response = await fetch(
        `${API_URL}/edit/workoutplan/${id}/${workoutplanID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(workoutPlan),
        }
      );

      if (response.ok) {
        // Workout plan submitted successfully
        console.log("Workout Plan Edit Submitted:", workoutPlan);
        // Optionally, reset the form or navigate away
        setEditMode(false);
        setShowEditSuccess(true);
      } else {
        // Handle server error
        setShowEditError(true);
        console.error(
          "Failed to submit workout plan edit:",
          response.statusText
        );
      }
    } catch (error) {
      // Handle network error
      console.error("Network error:", error.message);
    }
  };

  const groupLogsByWorkoutPlanName = () => {
    return workoutLogs.reduce((acc, log) => {
      const groupName = log.planName || "Unamed Plan";
      acc[groupName] = acc[groupName] || [];
      acc[groupName].push(log);
      return acc;
    }, {});
  };

  const groupedLogs = groupLogsByWorkoutPlanName();

  const handleExpandPlan = (workoutPlanID) => {
    setExpandedPlan(expandedPlan === workoutPlanID ? null : workoutPlanID);
  };

  const handleExpandLog = (workoutID) => {
    setExpandedLog(expandedLog === workoutID ? null : workoutID);
  };

  return (
    <div className="client-profile-page">
      <ClientNavbar />
      <div className="client-actions">
        <button className="back-button" onClick={handleGoBack}>
          Back
        </button>
        <button className="action-button" onClick={handleOpenMessageForm}>
          Send Message
        </button>
        <ConfirmationModal
          isOpen={isModalOpen}
          onConfirm={handleConfirm}
          onClose={handleCancel}
        />
        <button className="action-button" onClick={handleCreateWorkoutClick}>
          Create Client Workout
        </button>
        <WorkoutForm
          isOpen={showWorkoutForm}
          onClose={handleCancelCreateWorkout}
        />
      </div>
      {client && (
        <div className="client-profile-container">
          <div className="client-info-section">
            <div className="client-profile-info">
              <img
                className="client-img"
                src="https://i0.wp.com/www.lizzyc.com.au/journal/wp-content/uploads/2019/07/TGardiner0519_0012.jpg?resize=1024%2C682&ssl=1"
                alt="client profile"
              />
              <div className="client-details">
                <h1>
                  {client.firstname} {client.lastname}
                </h1>
                <p>Height: {heightConvert(client.height)}</p>
                <p>Weight: {client.weight}</p>
                <p>Goal Weight: {client.goalweight}</p>
                <p>Age: {client.age}</p>
                <p>Gender: {getGender(client.gender)}</p>
              </div>
            </div>
            <div className="client-workout-preferences">
              <h3>Workout Preferences:</h3>
              <p>Cycling: {binConvert(client.cycling)}</p>
              <p>Strength: {binConvert(client.strength)}</p>
              <p>Running: {binConvert(client.running)}</p>
              <p>Sports: {binConvert(client.sports)}</p>
              <p>Yoga: {binConvert(client.yoga)}</p>
              <p>Swimming: {binConvert(client.swimming)}</p>
              <p>Martial Arts: {binConvert(client.martialarts)}</p>
              <p>Other: {client.other}</p>
            </div>
            <div className="contact-info">
              <h3>CONTACT</h3>
              <p>Email: {client.email}</p>
            </div>
          </div>
          <div className="workouts_info">
            <h2>Sessions</h2>
            {Object.keys(groupedExercises).length === 0 ? (
              <p>No Workout Sessions Available</p>
            ) : (
              Object.keys(groupedExercises).map((workoutName) => (
                <div key={workoutName} className="workout-session">
                  <div
                    className="workout-header"
                    onClick={() => handleExpandToggle(workoutName)}
                  >
                    <h3>{workoutName}</h3>
                    <span className="dropdown-arrow">
                      {expandedWorkout === workoutName ? "▼" : "▶"}{" "}
                    </span>
                  </div>
                  {expandedWorkout === workoutName && (
                    <div className="exercise-list">
                      {!editMode ? (
                        <div>
                          <button onClick={() => handleEditMode(workoutName)}>
                            Edit Plan
                          </button>
                          {groupedExercises[workoutName].map((exercise) => (
                            <div key={exercise.workoutID}>
                              <p>
                                {getWorkoutNameById(exercise.workoutID)} - Sets:{" "}
                                {exercise.Sets}, Reps: {exercise.reps}{" "}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div>
                          <button onClick={() => handleEditClose()}>
                            Close
                          </button>
                          {workoutPlan.exercises.map((exercise, index) => (
                            <div key={index} className="exercise-form">
                              <label style={styles.labelStyle}>
                                Select Exercise:
                              </label>
                              <select
                                name="workoutID"
                                value={exercise.workoutID || ""}
                                onChange={(event) =>
                                  handleInputChange(index, event)
                                }
                              >
                                <option value="" disabled>
                                  Select an Exercise
                                </option>
                                {allExercises.map((option) => (
                                  <option
                                    key={option.workoutID}
                                    value={option.workoutID}
                                  >
                                    {option.workoutname}
                                  </option>
                                ))}
                              </select>
                              <label style={styles.labelStyle}>Sets:</label>
                              <input
                                type="number"
                                name="Sets"
                                value={exercise.Sets}
                                onChange={(event) =>
                                  handleInputChange(index, event)
                                }
                              />
                              <label style={styles.labelStyle}>Reps:</label>
                              <input
                                type="number"
                                name="reps"
                                value={exercise.reps}
                                onChange={(event) =>
                                  handleInputChange(index, event)
                                }
                              />

                              <button
                                type="button"
                                onClick={() => handleDeleteExercise(index)}
                              >
                                Delete Exercise
                              </button>
                            </div>
                          ))}
                          <button type="button" onClick={handleAddExercise}>
                            Add Exercise
                          </button>
                          {limitReachedMessage && <p>{limitReachedMessage}</p>}
                          {error && <p>{error}</p>}
                          <div>
                            <button
                              onClick={() => handleSubmitEdits(workoutName)}
                              style={styles.buttonStyle}
                            >
                              Save Edits
                            </button>
                          </div>
                        </div>
                      )}
                      {showEditSuccess && (
                        <MessagePopup
                          message={`Workout Plan Editted Successfully!`}
                        />
                      )}
                      {showEditError && (
                        <MessagePopup
                          message={`Workout Plan Edit Failed! Try Again`}
                        />
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
            <h2>Workout Logs</h2>
            {Object.keys(groupedLogs).length === 0 ? (
              <p>No Workout Log Entries</p>
            ) : (
              Object.entries(groupedLogs).map(([planName, logs]) => (
                <div key={planName} className="workout-log-group">
                  <div
                    className="workout-plan-header"
                    onClick={() => handleExpandPlan(planName)}
                  >
                    <h3>{planName} Logs</h3>
                    <span className="dropdown-arrow">
                      {expandedPlan === planName ? "▼" : "▶"}{" "}
                    </span>
                  </div>
                  {expandedPlan === planName && (
                    <div>
                      {logs.map((log, index) => (
                        <div key={index} className="workout-log">
                          <p>Workout ID: {getWorkoutNameById(log.workoutID)}</p>
                          <p>Sets: {log.sets}</p>
                          <p>Reps: {log.reps}</p>
                          <p>
                            Last Modified:{" "}
                            {new Date(log.lastmodified).toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
          <div className="client-logs-section">
            <h3>{client.firstname}'s Daily Logs</h3>
            <div className="graph-container">
              <Line data={calGraphData} />
            </div>
            <div className="graph-container">
              <Line data={waterGraphData} />
            </div>
            <div className="graph-container">
              <Line data={moodGraphData} options={moodOptions} />
            </div>
          </div>
          {showMessageForm && (
            <div className="lightbox">
              <div className="form-container">
                <span className="close" style = {{ color: 'white' }} onClick={handleCloseMessageForm}>
                  &times;
                </span>
                <form>
                  <label htmlFor="message">Message:</label>
                  <textarea
                    id="message"
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    style={{ color: "black" }}
                  ></textarea>
                  <button type="button" onClick={sendMessage}>
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
      <SuccessNotification
        isOpen={showSuccessNotification}
        onClose={() => setShowSuccessNotification(false)}
      />
    </div>
  );
};

const styles = {
  labelStyle: {
    display: "block",
    margin: "10px 0",
    color: "black",
  },

  buttonStyle: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default ClientProfile;
