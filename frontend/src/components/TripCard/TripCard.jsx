import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import { Typography } from '@material-ui/core';
import { red } from '@mui/material/colors';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import './TripCard.css';


const TripCard = (props) => {
    return ( 
        <Card sx={{ maxWidth: 800 }} variant={"outlined"} borderRadius='50%'>
            <CardHeader
                avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">{props.trip.driver.firstName[0].toUpperCase()}</Avatar>}
                action={<Button variant="contained" size="medium" color="secondary">Book</Button>}
                title={<Box display={'flex'} alignItems={'center'} mb={0}>{props.trip.driver.firstName}</Box>}
                subheader={<Box
                    display={'flex'}
                    alignItems={'center'}
                    mb={1}
                  >
                    <Rating name={'rating'} value={props.trip.driver.overallRating} size={'small'}/>
                    <Typography variant={'body2'}>
                    {props.trip.driver.overallRating}
                    </Typography>
                  </Box>}
            />
            <CardActionArea sx={{ maxWidth: 800 }}>
                <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {props.trip.departureDate}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                    {props.trip.seatPrice}
                </Typography>
                    <Box display={'flex'} alignItems={'center'}>
                        <Typography>{props.trip.departureCity}</Typography>
                        <ArrowForwardIcon/>
                        <Typography>{props.trip.arrivalCity}</Typography>
                    </Box>
                    <Box display={'flex'} flexDirection={'row-reverse'}>
                    <AirlineSeatReclineNormalIcon fontSize='large'/>
                <Typography variant="h5">{props.trip.availableSeats}</Typography>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>

     );
}
 
export default TripCard;

