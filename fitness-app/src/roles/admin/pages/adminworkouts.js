import React from 'react';
import ClientNavbar from '../../../components/navbar-visitor/clientnav';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Coach from "../../visitors/assets/coach.png"

const AdminWorkouts = () => {
    const API_URL = "http://127.0.0.1:5000";
    const [activeWorkout, setActiveWorkout] = useState([])
    const [deactiveWorkout, setDeactiveWorkout] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}/workouts`);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const responseData = await response.json();
                setActiveWorkout(responseData)

            } catch (error) {
                console.error('Error fetching data:', error);
            }

            try {
                const response = await fetch(`${API_URL}/workouts/deactivated`);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const responseData = await response.json();
                setDeactiveWorkout(responseData)

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    },[]);

    const handleDeactivate = (workout) => {
        console.log(workout.workoutID)
    }

    const handleActivate = (workout) => {
        console.log(workout.workoutID)
    }
    return (
        <div className="body_1">
            <ClientNavbar />
            <div>
                <button>Add Workout</button>
            </div>
            <div>
                Active Workouts:
            {activeWorkout.map((workout) => (
                <tr key={workout.workoutID}>
                    <div className='profile'>
                        <div className='left'>
                            <div className='name'> {workout.workoutname} </div>
                            <div className='name'>Muscle Group: {workout.musclegroup}</div>
                            <div className='name'>Equipment: {workout.equipment}</div>
                        </div>
                        <div className='middle'>
                            <div className='description'>Description: {workout.description} </div>
                        </div>
                        <div className='left'>
                            <button onClick={() => handleDeactivate(workout)}>Deactivate</button>
                        </div>
                    </div>
                </tr>
                ))}
        </div>

        <div>
            Deactive Workouts:
            {deactiveWorkout.map((workout) => (
                <tr key={workout.workoutID}>
                    <div className='profile'>
                        <div className='left'>
                            <div className='name'> {workout.workoutname} </div>
                            <div className='name'>Muscle Group: {workout.musclegroup}</div>
                            <div className='name'>Equipment: {workout.equipment}</div>
                        </div>
                        <div className='middle'>
                            <div className='description'>Description: {workout.description} </div>
                        </div>
                        <div className='left'>
                            <button onClick={() => handleActivate(workout)}>Activate</button>
                        </div>
                    </div>
                </tr>
                ))}

        </div>
        </div>
    )
}

export default AdminWorkouts