import React from 'react';
import ClientNavbar from '../../../components/navbar-visitor/clientnav';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const AdminCoaches = () => {
    const API_URL = "http://127.0.0.1:5000";
    const clientID = Cookies.get('id');
    const role = Cookies.get("role");
    // const navigate = useNavigate();
    const [coaches, setCoaches] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}/admin/requests`);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const responseData = await response.json();
                setCoaches(responseData)

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    },[]);
    console.log(coaches)
  return (
    <div className='body_1'>
      Admins Only
      <ClientNavbar/>
      {coaches.map((coach) => (
        <tr key={coach.coachexpID}>
            <div className='profile'> 
            <div className='left'>
            <name>Name: {coach.firstname} {coach.lastname}</name>
            <price>Price: {coach.price}</price>
            
            </div>
            <div className="middle">
                <gym>Gym: {coach.gym}</gym>
                <town>Town: {coach.town}</town>
                <state>State: {coach.state}</state>
            </div>
            
            <div className="right">
              <experience>Experience: {coach.experience}</experience>
              <ratings>Ratings: {coach.rating}</ratings>
            </div>
            <div className='actions_2'>
              <button>Approve</button>
              <button>Deny</button>
            </div>
            </div>
        </tr>
      ))}
    </div>
  );
};

export default AdminCoaches;
