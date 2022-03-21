import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { getCheckInsPath, rideDetailsPath } from "../constants/apiPaths";

const TripContext = createContext();

export default TripContext;

export const TripProvider = ({ children }) => {
  const [selectedTrip, setSelectedTrip] = useState();
  const [checkIns, setCheckIns] = useState();
  const navigate = useNavigate();
  const [user, token] = useAuth()


  const getSingleTrip = async (tripID) => {
    try {
      let response = await axios.get(rideDetailsPath(tripID));
        setSelectedTrip(response.data);
        navigate("/details");
    } catch (error) {
      console.log(error.message);
    }
  };

  const getCheckIns = async (tripID) => {
    try {
        let response = await axios.get(getCheckInsPath(tripID), {
            headers: {
                Authorization: 'Bearer' + token
            }
        })
        setCheckIns(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };


  const logoutUser = () => {
    if (user) {
      localStorage.removeItem("token");
      setUser(null);
      setToken(null);
      navigate("/");
    }
  };

  const contextData = {
    user,
    token,
    loginUser,
    logoutUser,
    registerUser,
    isServerError,
  };

  return (
    <TripContext.Provider value={contextData}>{children}</TripContext.Provider>
  );
};