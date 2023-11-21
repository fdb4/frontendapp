import React, { useState, useEffect } from "react";
import ClientNavbar from "../../../components/navbar-visitor/clientnav";
import "../styling/clientcoaches.css";
import { Link } from "react-router-dom";

function ClientCoaches() {
  const [coaches, setCoaches] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [coachesPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    type: "",
    value: "",
  });

  useEffect(() => {
    fetchData();
  }, [filters, searchTerm]);

  const fetchData = async () => {
    try {
      let url = "http://127.0.0.1:5000/coaches";

      if (filters.type && filters.value) {
        switch (filters.type) {
          case "name":
            url = `http://127.0.0.1:5000/coaches/filter/name/${filters.value}`;
            break;
          case "gym":
            url = `http://127.0.0.1:5000/coaches/filter/gym/${filters.value}`;
            break;
          case "state":
            url = `http://127.0.0.1:5000/coaches/filter/state/${filters.value}`;
            break;
          case "town":
            url = `http://127.0.0.1:5000/coaches/filter/town/${filters.value}`;
            break;
          case "experience":
            url = `http://127.0.0.1:5000/coaches/filter/experience/${filters.value}`;
            break;
          case "ratings":
            url = `http://127.0.0.1:5000/coaches/filter/ratings/${filters.value}`;
            break;
          case "price":
            url = `http://127.0.0.1:5000/coaches/filter/price/${filters.value}`;
            break;
          default:
            break;
        }
      }

      const response = await fetch(url);
      const data = await response.json();
      setCoaches(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const paginate = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) {
      return;
    }
    setCurrentPage(pageNumber);
  };

  const indexOfLastCoach = currentPage * coachesPerPage;
  const indexOfFirstCoach = indexOfLastCoach - coachesPerPage;
  const currentCoaches = coaches.slice(indexOfFirstCoach, indexOfLastCoach);
  const totalPages = Math.ceil(coaches.length / coachesPerPage);

  const handleFilterChange = (selectedFilter) => {
    setFilters({
      type: selectedFilter,
      value: "",
    });
  };

  const handleFilter = () => {
    fetchData();
  };

  const handleClear = () => {
    setSearchTerm("");
    setFilters({
      type: "",
      value: "",
    });
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="body_1">
      <ClientNavbar />
      <h1>COACHES</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search"
          value={filters.value}
          onChange={(e) => setFilters({ ...filters, value: e.target.value })}
        />
        <select
          value={filters.type}
          onChange={(e) => handleFilterChange(e.target.value)}
        >
          <option value="" disabled>
            Filter by:
          </option>
          <option value="name">Name</option>
          <option value="gym">Gym</option>
          <option value="state">State</option>
          <option value="town">Town</option>
          <option value="experience">Experience</option>
          <option value="ratings">Ratings</option>
          <option value="price">Price</option>
        </select>
        <button onClick={handleFilter}>Filter</button>
        <button onClick={handleClear}>Clear</button>
      </div>
      {currentCoaches.map((coach) => (
        <tr key={coach.clientID}>
          <div className="profile">
            <div className="left">
              <name>{coach.firstname} {coach.lastname}</name>
              <age>Age: </age>
              <price>Price: ${coach.price}</price>
              <gym>Gym: {coach.gym}</gym>
            </div>

            <div className="middle">
              <div className="location">
                <town>Town: {coach.town} </town>
                <state>State: {coach.state}</state>
              </div>
              <div className="middle_2">
                <experience>Experience: {coach.experience}</experience>
                <ratings>Ratings: {coach.rating}</ratings>
              </div>
            </div>

            <div className="right">
              <div className="contact">
                <contact>CONTACT</contact>
                <email>Email: {coach.email}</email>
              </div>
              <Link to={`/coaches/${coach.clientID}`} className="view">VIEW PROFILE</Link>
            </div>
          </div>
        </tr>
      ))}
      <div className="pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page
          <input
            type="number"
            value={currentPage}
            onChange={(e) => setCurrentPage(e.target.value)}
            onBlur={() => paginate(parseInt(currentPage))}
            min="1"
            max={totalPages}
          />
          of {totalPages}
        </span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ClientCoaches;
