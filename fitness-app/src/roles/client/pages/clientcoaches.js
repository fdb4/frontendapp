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
    <div className="cc-client-coaches">
      <ClientNavbar />
      <h1 className="cc-title" style = {{ fontFamily: 'Copperplate, Papyrus, fantasy' }}>COACHES</h1>
      <div className="cc-search-container">
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
      <div className="cc-coach-list">
        {currentCoaches.map((coach) => (
          <div key={coach.clientID} className="cc-coach-profile">
          <img className="cc-coach-img" src={Coach} alt="coach profile" />
            <div className="cc-left">
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: 'black', fontFamily: 'Copperplate, Papyrus, fantasy' }}>{coach.firstname} {coach.lastname}</p>
              <p style = {{ color: 'black', fontFamily: 'Copperplate, Papyrus, fantasy' }}>Price: ${coach.price}</p>
              <p style = {{ color: 'black', fontFamily: 'Copperplate, Papyrus, fantasy' }}>Gym: {coach.gym}</p>
              <div className="cc-specializations" style = {{ color: 'black', fontFamily: 'Copperplate, Papyrus, fantasy' }}>
                Specializations
                {coach.specializations && (
                  <ul className="cc-listing" style = {{ color: 'black', fontFamily: 'Copperplate, Papyrus, fantasy' }}>
                    {coach.specializations.map((specialization, index) => (
                      <li key={index}>{specialization}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="cc-middle" >
              <p style = {{ color: 'black', fontFamily: 'Copperplate, Papyrus, fantasy' }}>Town: {coach.town}</p>
              <p style = {{ color: 'black', fontFamily: 'Copperplate, Papyrus, fantasy' }}>State: {coach.state}</p>
              <p style = {{ color: 'black', fontFamily: 'Copperplate, Papyrus, fantasy' }}>Experience: {coach.experience}</p>
              <p style = {{ color: 'black', fontFamily: 'Copperplate, Papyrus, fantasy' }}>Ratings: {coach.rating}</p>
            </div>
            <div className="cc-right">
              <p style = {{ fontSize: '18px', fontWeight: 'bold', color: 'black', fontFamily: 'Copperplate, Papyrus, fantasy' }}>CONTACT:</p>
              <p style = {{ fontSize: '12px', color: 'black', fontFamily: 'Copperplate, Papyrus, fantasy' }}>Email: {coach.email}</p>
              <Link to={`/coaches/${coach.clientID}`} className="cc-view">
                VIEW PROFILE
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="cc-pagination">
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
