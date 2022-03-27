import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { getCheckInsPath, rideDetailsPath } from "../../constants/apiPaths";
import Map, { MapContainer } from "../../components/Map/Map";
import DisplayCheckIns from "../../components/DisplayCheckIns/DisplayCheckIns";
import TripContext from "../../context/TripContext";
import TripInfo from "../../components/TripInfo/TripInfo";
import CheckInModal from "../../components/CheckInModal/CheckInModal";
import EditModal from "../../components/common/EditModal/EditModal";
import ReviewModal from "../../components/ReviewModal/ReviewModal";
import TripEditMenu from "../../components/TripEditMenu/TripEditMenu";
import { Container, Grid } from "@mui/material";
import BookTripModal from "../../components/BookTripModal/BookTripModal";

const TripDetailsPage = () => {

    const navigate = useNavigate()
	const [user, token] = useAuth()
	// const [checkIns, setCheckIns] = useState([]);
	const { selectedTrip, getCheckIns, checkIns } = useContext(TripContext);
	const [passengerIDs, setPassengerIDs] = useState([])
	const [availableSeats, setavailableSeats] = useState()
	const [isInEditMode, setIsInEditMode] = useState(false);

    // async function fetchRideDetails(tripID) {
	// 	let response = await axios.get(rideDetailsPath(tripID))
	// 		.then(response => {
	// 			console.log(response);
	// 		})
	// 		.catch(error => {
	// 			console.log(error.response);
	// 		});
	// }

	// async function getCheckIns(tripID) {
	// 	let response = await axios.get(getCheckInsPath(tripID), {
	// 		headers: {
	// 			Authorization: 'Bearer' + token
	// 		}
	// 	})
	// 		.then(response => {
	// 			console.log(response);
	// 			setCheckIns(response);
	// 		})
	// 		.catch(error => {
	// 			console.log(error.response);
	// 		});
	// }

	useEffect(() => {
		let isUserPassenger = selectedTrip.passengers.filter((passenger)=>{return user.id === passenger.passenger.id});
		if(user.id === selectedTrip.driver.id || isUserPassenger){
			getCheckIns(selectedTrip.id); 
		}
		setPassengerIDs(getPassengerIDs(selectedTrip));
		setavailableSeats(getAvailableSeats(selectedTrip));
	}, []);

	function getAvailableSeats(trip){
		let passengerSeats = 0;
		trip.passengers.map((passenger)=>{
			passengerSeats += passenger.seats_booked
		})
		return trip.total_passenger_seats - passengerSeats;
	}

	function getPassengerIDs(trip){
		let ids = trip.passengers.map((passenger)=>{
			return passenger.passenger.id
		})
		return ids;
	}
	
	
    return ( 
		<>
		<Container maxWidth="xl">
			<Grid container spacing={2}>
				<Grid item xs={11} sm={11} md={5}>
					<TripInfo passengerIDs={passengerIDs} seats={availableSeats} isInEditMode={isInEditMode} setIsInEditMode={setIsInEditMode}/>
				</Grid>
				<Grid item xs={1} sm={1} md={1}>
					<TripEditMenu setIsInEditMode={setIsInEditMode}/>
				</Grid>
				<Grid item md={6} zeroMinWidth>
					<Map/>
					<DisplayCheckIns/>
				</Grid>
				<Grid item md={6}>
				</Grid>
				{/* <EditModal/> */}
				{/* <ReviewModal trip={selectedTrip}/> */}
				
					<CheckInModal/>

				{!passengerIDs.includes(user.id) && selectedTrip.driver.id != user.id && availableSeats > 0 && <BookTripModal trip={selectedTrip} seats={availableSeats}/>}

					

			</Grid>
		</Container>
		</>
    );
}
 
export default TripDetailsPage;