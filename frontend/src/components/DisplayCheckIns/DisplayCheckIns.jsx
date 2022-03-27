import { Box, Stack } from '@mui/material';
import axios from 'axios';
import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import TripContext from '../../context/TripContext';
import useAuth from '../../hooks/useAuth';
import CheckInCard from '../CheckInCard/CheckInCard';

const DisplayCheckIns = (props) => {

    const [user, token] = useAuth()
    const { checkIns, getCheckIns, selectedTrip } = useContext(TripContext);


    return ( 
		<Stack>
			{checkIns.map(function(checkIn){
				return <CheckInCard checkIn={checkIn}/>;
			})}
		</Stack>
    );
}
 
export default DisplayCheckIns;