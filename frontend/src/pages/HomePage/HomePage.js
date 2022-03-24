import React from "react";
import { useEffect, useState } from "react";

import axios from "axios";
import useAuth from "../../hooks/useAuth";
import TripCard from "../../components/TripCard/TripCard";
import ReviewModal from "../../components/ReviewModal/ReviewModal";
import SearchBar from "../../components/SearchBar/SearchBar";
import RideSearchBar from "../../components/RideSearchBar/RideSearchBar";
import { searchRidesPath } from "../../constants/apiPaths";
import BookTripModal from "../../components/BookTripModal/BookTripModal";
import AddTripModal from "../../components/AddTripModal/AddTripModal";

const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  const [user, token] = useAuth();
  const [trip, setTrip] = useState({driver: {first_name: "John", overallRating: 4.5}, departure_date: "3/14/2022", seat_price: 20, departure_city: "New York", arrival_city: "Boston", total_passenger_seats: 3, departure_time: "3:15pm"});
  const [searchResults, setSearchResults] = useState([]);
  // const [cars, setCars] = useState([]);

  const searchTrips = async (formData) => {
    formData = {...formData, ['departureDate']: `${formData.departureDate.getFullYear()}-${formData.departureDate.getMonth() + 1}-${formData.departureDate.getDate()}`}
    try {
      let response = await axios.get(searchRidesPath(formData.departureCity, formData.arrivalCity, formData.departureDate));
        setSearchResults(response.data);
        console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log(searchResults)

  function getAvailableSeats(trip){
    let passengerSeats = 0;
    trip.passengers.map((passenger)=>{
        passengerSeats += passenger.seats_booked
    })
    return trip.total_passenger_seats - passengerSeats;
}
  // useEffect(() => {
  //   const fetchCars = async () => {
  //     try {
  //       let response = await axios.get("http://127.0.0.1:8000/api/cars/", {
  //         headers: {
  //           Authorization: "Bearer " + token,
  //         },
  //       });
  //       setCars(response.data);
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   };
  //   fetchCars();
  // }, [token]);
  return (
    <div className="container">
      <h1>Find a Ride</h1>
      {/* {cars &&
        cars.map((car) => (
          <p key={car.id}>
            {car.year} {car.model} {car.make}
          </p>
        ))} */}

        {/* <ReviewModal/>
        <SearchBar/> */}
        <RideSearchBar searchTrips={searchTrips}/>
        {searchResults.length > 0 ? searchResults.map((trip, index) => {
          let seats = getAvailableSeats(trip);
          if (seats > 0){
            return (<TripCard key={index} trip={trip} availableSeats={seats}/>);
          }
        
          }) : <p>No trips</p>}

        <AddTripModal/>
    </div>
  );
};

export default HomePage;
