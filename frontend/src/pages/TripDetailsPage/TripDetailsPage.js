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

const TripDetailsPage = () => {

    const navigate = useNavigate()
	const [user, token] = useAuth()
	// const [checkIns, setCheckIns] = useState([]);
	const { selectedTrip, getCheckIns, checkIns } = useContext(TripContext);

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
	}, []);
	
	
    return ( 
		<>
			<TripInfo/>
			<CheckInModal/>
			<Map/>
			{/* <DisplayCheckIns/> */}
		</>
    );
}
 
export default TripDetailsPage;