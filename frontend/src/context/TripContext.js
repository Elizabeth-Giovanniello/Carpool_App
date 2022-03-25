import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { getCheckInsPath, rideDetailsPath } from "../constants/apiPaths";
import useAuth from "../hooks/useAuth";

const TripContext = createContext();

export default TripContext;

export const TripProvider = ({ children }) => {
  const [selectedTrip, setSelectedTrip] = useState(JSON.parse(localStorage.getItem("selectedTrip")));
  const [checkIns, setCheckIns] = useState([]);
  const navigate = useNavigate();
  const [user, token] = useAuth()


  const getSingleTrip = async (tripID) => {
    try {
      let response = await axios.get(rideDetailsPath(tripID));
        setTrip(response.data);
        navigate("/details");
    } catch (error) {
      console.log(error.message);
    }
  };

  const getCheckIns = async (tripID) => {
    try {
        let response = await axios.get(getCheckInsPath(tripID), {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        setCheckIns(response.data);
        console.log(checkIns);
    } catch (error) {
      console.log(error.message);
    }
  };

  const setTrip = (trip) => {
    localStorage.setItem("selectedTrip", JSON.stringify(trip));
    setSelectedTrip(JSON.parse(localStorage.getItem("selectedTrip")))
  }


  const contextData = {
    selectedTrip,
    checkIns,
    getSingleTrip,
    getCheckIns,
    setTrip,
  };

  return (
    <TripContext.Provider value={contextData}>{children}</TripContext.Provider>
  );
};