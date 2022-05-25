import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { checkPastReviewsPath, getCheckInsPath, getUserReviewsPath, profileDetailsPath, rideDetailsPath } from "../constants/apiPaths";
import useAuth from "../hooks/useAuth";

const PersonContext = createContext();

export default PersonContext;

export const PersonProvider = ({ children }) => {
  const [selectedPerson, setSelectedPerson] = useState(localStorage.getItem("selectedPerson"));
  const [reviews, setReviews] = useState(JSON.parse(localStorage.getItem("reviews")));
  const [profileDetails, setProfileDetails] = useState(JSON.parse(localStorage.getItem("profileDetails")));
  const [pastReviews, setPastReviews] = useState(JSON.parse(localStorage.getItem("pastReviews")));
  const [isLoggedInUser, setIsLoggedInUser] = useState(false);
  const navigate = useNavigate();
  const [user, token] = useAuth()


    const loadPerson = personID => {
        setPerson(personID);
        getUserInfo(personID);
        getReviews(personID);
        checkUserPermissions();
        navigate("/user");
    }

  const checkUserPermissions = () => {
    if(user && selectedPerson === user.id){
        setIsLoggedInUser(true);
    }
    else{setIsLoggedInUser(false)}
  }

  const getReviews = async (personID) => {
    try {
        let response = await axios.get(getUserReviewsPath(personID))
        storeUserReviews(response.data);
        console.log(reviews);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getUserInfo = async (personID) => {
    try {
        let response = await axios.get(profileDetailsPath(personID))
        storeUserDetails(response.data);
        console.log(profileDetails);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getPastReviews = async () => {
    try {
        let response = await axios.get(checkPastReviewsPath, {
          headers: {
              Authorization: 'Bearer ' + token
          }
      })
        storePastReviews(response.data);
        console.log(pastReviews);
        navigate('/rides')
    } catch (error) {
      console.log(error.message);
    }
  };

  const setPerson = (person) => {
    localStorage.setItem("selectedPerson", person);
    setSelectedPerson(localStorage.getItem("selectedPerson"))
  }

  const storePastReviews = (reviews) => {
    localStorage.setItem("pastReviews", JSON.stringify(reviews));
    setPastReviews(JSON.parse(localStorage.getItem("pastReviews")))
  }

  const storeUserReviews = (reviews) => {
    localStorage.setItem("reviews", JSON.stringify(reviews));
    setReviews(JSON.parse(localStorage.getItem("reviews")))
  }

  const storeUserDetails = (details) => {
    localStorage.setItem("profileDetails", JSON.stringify(details));
    setProfileDetails(JSON.parse(localStorage.getItem("profileDetails")))
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
    setPerson,
    pastReviews,
    getPastReviews,
    getUserInfo,
    profileDetails,
  };

  return (
    <PersonContext.Provider value={contextData}>{children}</PersonContext.Provider>
  );
};