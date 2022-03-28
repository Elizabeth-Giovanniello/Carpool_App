import React, { Fragment, useContext } from 'react';
// import { Card } from 'react-bootstrap';
import TripContext from '../../context/TripContext';
import CheckInEditMenu from '../CheckInEditMenu/CheckInEditMenu';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardHeader, Container, Rating } from '@mui/material';
import { getTime } from '../../helpers/helpers';

const SingleReview = ({review}) => {
    return ( 
      <Container maxWidth="md">
            <Card sx={{ minWidth: 275, mb: 1 }}>
            <CardHeader
                sx={{pb: 0}}
                title={
                        <Rating value={review.rating} size={'small'} precision={0.1} readOnly/>}
                        subheader={<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {review.is_driver ? "Driver" : "Passenger"}
                    </Typography>
                        
                    }
            >

            </CardHeader>
            {review.comment &&
                <CardContent sx={{pb: 0}}>
                    <Typography variant="body2">
                    {review.comment}
                    </Typography>
                </CardContent>
            }
            </Card>
      </Container>

    );
}
 
export default SingleReview;