import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { getAllTripsPath, getPassengersPath } from '../../constants/apiPaths';
import { getIsFutureDate, getIsPastDate } from '../../helpers/helpers';
import useAuth from '../../hooks/useAuth';
import TripCard from '../TripCard/TripCard';

const UpcomingTrips = ({trips, tripPassengers}) => {

    const [user, token] = useAuth();
    const [upcomingTrips, setUpcomingTrips] = useState([]);
    const [pastTrips, setPastTrips] = useState([]);
    const [currentTrips, setCurrentTrips] = useState([]);
    


    const findAndCategorizeUserTrips = (trips) => {
        let futureTrips = []
        let ongoingTrips = []
        let completedTrips = []
        let passengerTrips = findUserPassengerTrips();
        trips.map((trip)=>{
            if(trip.driver.id === user.id || passengerTrips.includes(trip.id)){
                if (getIsFutureDate(trip.departure_date)){
                    futureTrips.push(trip);
                }
                else if (getIsPastDate(trip.departure_date)){
                    completedTrips.push(trip);
                }
                else {ongoingTrips.push(trip);}
            }
        })
        setUpcomingTrips(futureTrips);
        setPastTrips(completedTrips);
        setCurrentTrips(ongoingTrips);
    }

    const findUserPassengerTrips = () => {
        let passengers = tripPassengers.map((passenger) =>{
            if(passenger.passenger.id === user.id){
                return passenger.trip
            }
        })
        return passengers;
    }


    useEffect(() => {
        findAndCategorizeUserTrips(trips)
    }, []);
 
    //TODO: the logic is written but formatting is off. get it to not error out and then test. If time permits, swap trip card w its own card for a different vibe; maybe diff colors for diff cats, like gray for past, green for ongoing, etc.
    if(currentTrips.length>0 || upcomingTrips.length>0 || pastTrips.length>0){
        return ( 
            <>
            {currentTrips.length > 0 && 
            <Fragment>
                <h5>Ongoing</h5>
               { currentTrips.map((trip, index)=><TripCard key={index} trip={trip}/>)}
            </Fragment>}
            {upcomingTrips.length > 0 && 
            <Fragment>
                <h5>Upcoming trips</h5>
                {upcomingTrips.map((trip, index)=><TripCard key={index} trip={trip}/>)}
            </Fragment>}
            {pastTrips.length > 0 && 
            <Fragment>
                <h5>Past trips</h5>
                {pastTrips.map((trip, index)=><TripCard key={index} trip={trip}/>)}
            </Fragment>}
            </>
         );
    }
    else{return null}
}
 
export default UpcomingTrips;