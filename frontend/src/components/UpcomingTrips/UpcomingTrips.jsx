import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { getAllTripsPath, getPassengersPath } from '../../constants/apiPaths';
import useAuth from '../../hooks/useAuth';
import TripCard from '../TripCard/TripCard';

const UpcomingTrips = ({trips, tripPassengers}) => {

    const [user, token] = useAuth();


    const findUpcomingTrips = () => {
        let passengerTrips = findUserPassengerTrips();
        let tripCards = trips.map((trip,index)=>{
            if(trip.driver.id === user.id || passengerTrips.includes(trip.id)){
                return <TripCard key={index} trip={trip}/>
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


    return ( 
        findUpcomingTrips() || null
     );
}
 
export default UpcomingTrips;