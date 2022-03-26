import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { getCheckInsPath, getUserReviewsPath, rideDetailsPath } from "../constants/apiPaths";
import useAuth from "../hooks/useAuth";

const PersonContext = createContext();

export default PersonContext;

export const PersonProvider = ({ children }) => {
  const [selectedPerson, setSelectedPerson] = useState(localStorage.getItem("selectedPerson"));
  const [reviews, setReviews] = useState([]);
  const [isLoggedInUser, setIsLoggedInUser] = useState(false);
  const navigate = useNavigate();
  const [user, token] = useAuth()


    const loadPerson = personID => {
        setPerson(personID);
        getReviews(personID);
        checkUserPermissions();
        navigate("/user");
    }

  const checkUserPermissions = () => {
    if(selectedPerson === user.id){
        setIsLoggedInUser(true);
    }
    else{setIsLoggedInUser(false)}
  }

  const getReviews = async (personID) => {
    try {
        let response = await axios.get(getUserReviewsPath(personID), {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        setReviews(response.data);
        console.log(reviews);
    } catch (error) {
      console.log(error.message);
    }
  };

  const setPerson = (person) => {
    localStorage.setItem("selectedPerson", person);
    setSelectedPerson(localStorage.getItem("selectedPerson"))
  }
  


  const contextData = {
    selectedPerson,
    setSelectedPerson,
    getReviews,
    loadPerson,
    isLoggedInUser,
    setIsLoggedInUser,
    reviews, 
    checkUserPermissions,
    setPerson
  };

  return (
    <PersonContext.Provider value={contextData}>{children}</PersonContext.Provider>
  );
};