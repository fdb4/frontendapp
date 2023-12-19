import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth";
import Cookies from "js-cookie";
import API_URL from "./apiConfig";

const CoachSurveyCheck = ({ children }) => {
  const clientID = Cookies.get("id");
  const role = Cookies.get("role");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/doneCoachSurvey/${clientID}`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();

        if (responseData.survey === 0) {
          console.log("here");
          navigate("/clienthome");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [clientID, navigate]);

  return children;
};

export default CoachSurveyCheck;