import React from "react";
import { useEffect, useState } from "react";

import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { rideDetailsPath } from "../../constants/apiPaths";
import Map, { MapContainer } from "../../components/Map/Map";

const TripDetailsPage = () => {

    // async function fetchRideDetails(tripID) {
	// 	let response = await axios.get(rideDetailsPath(tripID))
	// 		.then(response => {
	// 			console.log(response);
	// 		})
	// 		.catch(error => {
	// 			console.log(error.response);
	// 		});
	// }
    return ( 
        <Map/>
    );
}
 
export default TripDetailsPage;