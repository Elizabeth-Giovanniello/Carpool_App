import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { getAllTripsPath, getPassengersPath } from '../../constants/apiPaths';
import { getIsFutureDate, getIsPastDate } from '../../helpers/helpers';
import useAuth from '../../hooks/useAuth';
import TripCard from '../TripCard/TripCard';

const UpcomingTrips = ({trips, tripPassengers}) => {

    const [user, token] = useAuth();
    const [upcomingTrips, setUpcomingTrips] = useState([]);
    const [pastTrips, setPastTrips] = useState([]);
    const [currentTrips, setCurrentTrips] = useState([]);
    


    const findAndCategorizeUserTrips = () => {
        let passengerTrips = findUserPassengerTrips();
        let tripCards = trips.map((trip,index)=>{
            if(trip.driver.id === user.id || passengerTrips.includes(trip.id)){
                if (getIsFutureDate(trip.departure_date)){
                    setUpcomingTrips([...upcomingTrips, trip]);
                }
                else if (getIsPastDate(trip.departure_date)){
                    setPastTrips([...pastTrips, trip]);
                }
                else {setCurrentTrips([...currentTrips, trip]);}
            }
        })
        return tripCards;
    }

    const findUserPassengerTrips = () => {
        let passengers = tripPassengers.map((passenger) =>{
            if(passenger.passenger.id === user.id){
                return passenger.trip
            }
        })
        return passengers;
    }
 
    //TODO: the logic is written but formatting is off. get it to not error out and then test. If time permits, swap trip card w its own card for a different vibe; maybe diff colors for diff cats, like gray for past, green for ongoing, etc.
    return ( 
        <>
        {/* {currentTrips && 
        <h5>Ongoing</h5>
        currentTrips.map((trip, index)=>{<TripCard key={index} trip={trip}/>})}
        {upcomingTrips && 
        <h5>Upcoming trips</h5>
        upcomingTrips.map((trip, index)=>{<TripCard key={index} trip={trip}/>})}
        <h5>Past trips</h5>
        {pastTrips && pastTrips.map((trip, index)=>{<TripCard key={index} trip={trip}/>}) */}
        </>
     );
}
 
export default UpcomingTrips;