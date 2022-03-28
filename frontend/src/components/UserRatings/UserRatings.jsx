import { Avatar, Rating, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import PersonContext from '../../context/PersonContext';

const UserRatings = (props) => {

    const { reviews, selectedPerson } = useContext(PersonContext);
    const [overallRating, setOverallRating] = useState(0);
    const [driverRating, setDriverRating] = useState(0);
    const [passengerRating, setPassengerRating] = useState(0);


    const getRatingAvgs = () => {
        let driverCount = 0;
        let passengerCount = 0;
        let driverTotal = 0;
        let passengerTotal = 0;
        reviews.map((review)=> {
            if(review.is_driver){
                driverCount ++
                driverTotal += review.rating
            }
            else{
                passengerCount ++
                passengerTotal += review.rating
            }
        })
        console.log(driverCount);
        console.log(driverTotal);
        setDriverRating(getRoundedAvg(driverTotal, driverCount));
        setPassengerRating(getRoundedAvg(passengerTotal, passengerCount));
        setOverallRating(getRoundedAvg(driverTotal + passengerTotal, driverCount + passengerCount));
        console.log(passengerTotal);
    }
  
    function getRoundedAvg(total, count) {
        return roundToOneDecimal(total / count)
    }

    function roundToOneDecimal(value) {
        let multiplier = Math.pow(10, 1);
        return Math.round(value * multiplier) / multiplier;
    }

    useEffect(() => {
        getRatingAvgs();
    }, [reviews]);
    

    return ( 
        <Box>
            {/* <Avatar sx={{ bgcolor: selectedPerson.avatar_color }} aria-label="driver" >{selectedPerson.first_name[0].toUpperCase()}</Avatar> */}
            <Box>
                <Typography variant="body1">Overall rating: <Rating value={overallRating} size={'large'} precision={0.1} readOnly/>{overallRating ? overallRating : "N/A"}</Typography>
                <Typography variant="body2">Driver rating: <Rating value={driverRating} size={'medium'} precision={0.1} readOnly/>{driverRating ? driverRating : "N/A"}</Typography>
                <Typography variant="body2">Passenger rating: <Rating value={passengerRating} size={'medium'} precision={0.1} readOnly/>{passengerRating ? passengerRating : "N/A"}</Typography>
            </Box>
        </Box>
     );
}
 
export default UserRatings;