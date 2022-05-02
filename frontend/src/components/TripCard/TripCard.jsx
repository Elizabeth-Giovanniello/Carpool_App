import React, { Fragment, useContext } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Badge, Button, CardActionArea, CardActions, Grid, Paper, Tooltip } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import { Typography } from '@material-ui/core';
import { red } from '@mui/material/colors';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import './TripCard.css';
import TripContext from '../../context/TripContext';
import { useNavigate } from 'react-router-dom';
import BookTripModal from '../BookTripModal/BookTripModal';
import { getTime } from '../../helpers/helpers';
import PersonContext from '../../context/PersonContext';

const TripCard = (props) => {

    const { getSingleTrip } = useContext(TripContext);
    const { loadPerson } = useContext(PersonContext);
    const navigate = useNavigate()

    function handleClick(){
        getSingleTrip(props.trip.id)
    }

    const getBookingStatus = (isBooked) => {
        if(isBooked){
            return null;
        }else {return <BookTripModal trip={props.trip} seats={props.availableSeats}/>}
    }


    //TODO: fix rating issue in back end and then replace hardcoded value with variable
    return ( 
        <Box boxShadow={7} marginBottom={2} borderRadius={40} sx={{ maxWidth: 800 }}>

                <CardHeader
                    sx={{pb: 0}}
                    avatar={<Avatar sx={{ bgcolor: props.trip.driver.avatar_color }} aria-label="driver" onClick={()=>loadPerson(props.trip.driver.id)}>{props.trip.driver.first_name[0].toUpperCase()}</Avatar>}
                    action={getBookingStatus(props.isBooked)}
                    title={<Box display={'flex'} alignItems={'center'} mb={0} onClick={()=>loadPerson(props.trip.driver.id)}>{props.trip.driver.first_name}</Box>}
                    subheader={<Box
                        display={'flex'}
                        alignItems={'center'}
                        mb={1}
                        onClick={()=>loadPerson(props.trip.driver.id)}
                    >
                        {props.trip.driver_rating && <Rating name={'rating'} value={props.trip.driver_rating} size={'small'} precision={0.1} readOnly/>}
                        <Typography variant={'body2'}>
                        {Math.round(props.trip.driver_rating * 10) / 10} 
                        </Typography>
                        {!props.trip.driver_rating && <Tooltip title={`${props.trip.driver.first_name} is new to RideAlong and has no reviews yet`}><Badge
                            sx={{ margin: 2 }}
                            color="error"
                            badgeContent="Newbie!"
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                         ></Badge></Tooltip>}
                    </Box>}
                />

                    <CardContent  onClick={handleClick}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Box display={'flex'} alignItems="center" justifyContent="center">
                                    <Typography variant="h6">{props.trip.departure_city}</Typography>
                                    <ArrowForwardIcon variant="h6"/>
                                    <Typography variant="h6">{props.trip.arrival_city}</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={8} md={10}>
                                <Box display={'flex'} alignItems={'center'}>
                                    <Typography gutterBottom component="div" style={{color: 'gray'}}>
                                        {props.trip.departure_date}
                                    </Typography>
                                    <Typography gutterBottom component="div" style={{color: 'gray'}}>
                                        , {getTime(props.trip.departure_time)}
                                    </Typography>
                                </Box>
                            </Grid>
                            {!props.isBooked && 
                            <Fragment>
                                <Grid item >
                                    <Typography gutterBottom component="div" style={{color: 'green'}} marginBottom={0}>
                                        ${props.trip.seat_price}
                                    </Typography>
                                </Grid>
                            </Fragment>}
                            {!props.isBooked && <Fragment>
                                <Grid item >
                                    <Box display={'flex'}>
                                <Typography>{props.availableSeats}</Typography>
                                    <AirlineSeatReclineNormalIcon fontSize='medium' style={{color: 'gray'}}/>
                                    </Box>
                                </Grid>
                            </Fragment>}
                        </Grid>
                    </CardContent>


        </Box>

    );
}
 
export default TripCard;

