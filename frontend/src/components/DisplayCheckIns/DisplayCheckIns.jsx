import axios from 'axios';
import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import TripContext from '../../context/TripContext';
import useAuth from '../../hooks/useAuth';
import CheckInCard from '../CheckInCard/CheckInCard';

const DisplayCheckIns = (props) => {

    const [user, token] = useAuth()
    const { checkIns, getCheckIns, selectedTrip } = useContext(TripContext);

    // async function editCheckIn(checkInID, checkInData) {
	// 	let response = await axios.put(editCheckIn(checkInID), checkInData, {
	// 		headers: {
	// 			Authorization: 'Bearer' + token
	// 		}
	// 	})
	// 		.then(response => {
	// 			console.log(response);
	// 			getCheckIns();
	// 		})
	// 		.catch(error => {
	// 			console.log(error.response);
	// 		});
	// }


    return ( 
        checkIns.map(function(checkIn){
            return <CheckInCard checkIn={checkIn}/>;
        })
    );
}
 
export default DisplayCheckIns;