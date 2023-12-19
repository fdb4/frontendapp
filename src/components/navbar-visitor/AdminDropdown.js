// AdminDropdown.js
import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminDropdown = () => {
  return (
    <div
      style={{
        display: 'block', // Change from 'none' to 'block'
        position: 'absolute',
        backgroundColor: '#333',
        minWidth: '160px',
        boxShadow: '0 8px 16px 0 rgba(0, 0, 0, 0.2)',
        zIndex: 1,
      }}
    >
      <NavLink
        to="/admincoaches"
        activeStyle={{ backgroundColor: '#555' }}
        style={{
          padding: '12px 16px',
          textDecoration: 'none',
          display: 'block',
          color: 'white',
        }}
      >
        Admin Coaches
      </NavLink>
      <NavLink
        to="/adminworkouts"
        activeStyle={{ backgroundColor: '#555' }}
        style={{
          padding: '12px 16px',
          textDecoration: 'none',
          display: 'block',
          color: 'white',
        }}
      >
        Admin Workouts
      </NavLink>
    </div>
  );
};

export default AdminDropdown;
