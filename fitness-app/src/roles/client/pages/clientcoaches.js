import React, { useState, useEffect } from "react";
import ClientNavbar from "../../../components/navbar-visitor/clientnav";
import "../styling/clientcoaches.css";
import { Link } from "react-router-dom";
import Coach from "../../visitors/assets/coach.png";
import API_URL from "../../../components/navbar-visitor/apiConfig";

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
      let url = `${API_URL}/coaches`;

      if (filters.type && filters.value) {
        switch (filters.type) {
          case "gym":
            url = `${API_URL}/coaches/filter/gym/${filters.value}`;
            break;
          case "state":
            url = `${API_URL}/coaches/filter/state/${filters.value}`;
            break;
          case "town":
            url = `${API_URL}/coaches/filter/town/${filters.value}`;
            break;
          case "experience":
            url = `${API_URL}/coaches/filter/exp/${filters.value}`;
            break;
          case "ratings":
            url = `${API_URL}/coaches/filter/rating/${filters.value}`;
            break;
          case "price":
            url = `${API_URL}/coaches/filter/cost/${filters.value}`;
            break;
          case "specializations":
            url = `${API_URL}/coaches/filter/specialization/${filters.value}`;
            break;
          default:
            break;
        }
      }

      const response = await fetch(url);
      const data = await response.json();
      setCoaches(Array.from(data));
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

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

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
          <option value="gym">Gym</option>
          <option value="state">State</option>
          <option value="town">Town</option>
          <option value="experience">Experience</option>
          <option value="ratings">Ratings</option>
          <option value="price">Maximum Price</option>
          <option value="specializations">Specialization</option>
        </select>
        <button onClick={handleFilter}>Filter</button>
        <button onClick={handleClear}>Clear</button>
      </div>
      <div className="coach-list">
        {currentCoaches.map((coach) => (
          <div key={coach.clientID} className="profile">
          <img className="img" src={Coach} alt="coach profile" />
            <div className="left">
              <p>{coach.firstname} {coach.lastname}</p>
              <p>Price: ${coach.price}</p>
              <p>Gym: {coach.gym}</p>
              <div className="specializations">
                Specializations
                {coach.specializations && (
                  <ul className="listing">
                    {coach.specializations.map((specialization, index) => (
                      <li key={index}>{specialization}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="middle">
              <p>Town: {coach.town}</p>
              <p>State: {coach.state}</p>
              <p>Experience: {coach.experience}</p>
              <p>Ratings: {coach.rating}</p>
            </div>
            <div className="right">
              <p>CONTACT</p>
              <p>Email: {coach.email}</p>
              <Link to={`/coaches/${coach.clientID}`} className="view">
                VIEW PROFILE
              </Link>
            </div>
          </div>
        ))}
      </div>
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
