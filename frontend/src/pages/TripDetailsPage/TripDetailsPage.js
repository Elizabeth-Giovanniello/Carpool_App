import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { getCheckInsPath, rideDetailsPath } from "../../constants/apiPaths";
import Map, { MapContainer } from "../../components/Map/Map";
import DisplayCheckIns from "../../components/DisplayCheckIns/DisplayCheckIns";

const TripDetailsPage = () => {

    const navigate = useNavigate()
	const [user, token] = useAuth()
	const [checkIns, setCheckIns] = useState([]);

    // async function fetchRideDetails(tripID) {
	// 	let response = await axios.get(rideDetailsPath(tripID))
	// 		.then(response => {
	// 			console.log(response);
	// 		})
	// 		.catch(error => {
	// 			console.log(error.response);
	// 		});
	// }

	async function getCheckIns(tripID) {
		let response = await axios.get(getCheckInsPath(tripID), {
			headers: {
				Authorization: 'Bearer' + token
			}
		})
			.then(response => {
				console.log(response);
				setCheckIns(response);
			})
			.catch(error => {
				console.log(error.response);
			});
	}

	useEffect(() => {
		getCheckIns(); //TODO: add functionality to pass in TripID
	}, []);
	
	
    return ( 
		<>
			<Map checkIns={checkIns}/>
			<DisplayCheckIns checkIns={checkIns} getCheckIns={getCheckIns}/>
		</>
    );
}
 
export default TripDetailsPage;