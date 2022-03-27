import { Paper, Rating, Typography } from '@mui/material';
import React from 'react';

const SingleReview = ({review}) => {
    return ( 
        <Paper variant="outlined">
            <Rating value={review.rating} size={'small'} precision={0.1} readOnly/>
            <Typography variant="h6">{review.is_driver ? "Driver" : "Passenger"}</Typography>
            <Typography variant="body1">{review.comment}</Typography>

        </Paper>
    );
}
 
export default SingleReview;