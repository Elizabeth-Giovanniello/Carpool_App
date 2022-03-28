
import UpcomingTrips from '../../components/UpcomingTrips/UpcomingTrips';
import PersonContext from '../../context/PersonContext';
import TripContext from '../../context/TripContext';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { getAllTripsPath, getPassengersPath } from '../../constants/apiPaths';





const RideHistoryPage = () => {

    const { selectedTrip } = useContext(TripContext);
    const { pastReviews } = useContext(PersonContext);
    const [user, token] = useAuth()



    const [tripPassengers, setTripPassengers] = useState([]);
    const [trips, setTrips] = useState([]);


    
    const getPassengers = async () => {
        try {
            let response = await axios.get(getPassengersPath, {
            headers: {
                Authorization: "Bearer " + token,
            },
            });
            setTripPassengers(response.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    const getAllTrips = async () => {
        try {
            let response = await axios.get(getAllTripsPath, {
            headers: {
                Authorization: "Bearer " + token,
            },
            });
            setTrips(response.data);
        } catch (error) {
            console.log(error.message);
        }
    };


    useEffect(() => {
        getPassengers()
        console.log(tripPassengers)
        getAllTrips()
        console.log(trips)
    }, []);



    return ( 
        trips && tripPassengers ? <UpcomingTrips trips={trips} tripPassengers={tripPassengers}/> : null
        
    );
}
 
export default RideHistoryPage;