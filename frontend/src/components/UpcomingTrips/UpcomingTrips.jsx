import { Container } from '@mui/material';
import axios from 'axios';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { getAllTripsPath, getPassengersPath } from '../../constants/apiPaths';
import PersonContext from '../../context/PersonContext';
import { getIsFutureDate, getIsPastDate } from '../../helpers/helpers';
import useAuth from '../../hooks/useAuth';
import ReviewModal from '../ReviewModal/ReviewModal';
import RideSummaryCard from '../RideSummaryCard/RideSummaryCard';
import RideSummaryCardReview from '../RideSummaryCardReview/RideSummaryCardReview';
import TripCard from '../TripCard/TripCard';

const UpcomingTrips = ({trips, tripPassengers}) => {

    const [user, token] = useAuth();
    const { pastReviews } = useContext(PersonContext);
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

    const determineCompletedReview = (trip) => {
        let reviewCompleted = false; 
        pastReviews.map((review)=>{
            if (review.trip===trip.id){
                reviewCompleted = true;
            }
        })
        return reviewCompleted;
    }


    useEffect(() => {
        findAndCategorizeUserTrips(trips)
    }, [trips, tripPassengers]);
    
 console.log(trips)
 console.log(tripPassengers)
 console.log(upcomingTrips)
 console.log(pastTrips)
 console.log(currentTrips)

    //TODO: the logic is written but formatting is off. get it to not error out and then test. If time permits, swap trip card w its own card for a different vibe; maybe diff colors for diff cats, like gray for past, green for ongoing, etc.
    if(pastReviews && currentTrips.length>0 || upcomingTrips.length>0 || pastTrips.length>0){
        return ( 
            <>
            <Container maxWidth="md">
                {currentTrips.length > 0 && 
                <Fragment>
                    <h2>Ongoing</h2>
                { currentTrips.map((trip, index)=><TripCard key={index} trip={trip} isBooked={true}/>)}
                </Fragment>}
                {upcomingTrips.length > 0 && 
                <Fragment>
                    <h2>Upcoming trips</h2>
                    {upcomingTrips.map((trip, index)=><TripCard key={index} trip={trip} isBooked={true}/>)}
                </Fragment>}
                {pastTrips.length > 0 && 
                <Fragment>
                    <h2>Past trips</h2>
                    {pastTrips.map((trip, index)=>determineCompletedReview(trip) ? <RideSummaryCard trip={trip}/> : <RideSummaryCardReview trip={trip}/>)}
                </Fragment>}

            </Container>
            </>
         );
    }
    else{return null}
}
 
export default UpcomingTrips;