import React, { Fragment, useContext, useEffect, useReducer } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Badge, Button, CardActionArea, CardActions, Collapse, Grid, ListItem, Paper, Tooltip } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import { Typography } from '@material-ui/core';
import { red } from '@mui/material/colors';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TripContext from '../../context/TripContext';
import { useNavigate } from 'react-router-dom';
import BookTripModal from '../BookTripModal/BookTripModal';
import { getTime } from '../../helpers/helpers';
import PersonContext from '../../context/PersonContext';
import useAuth from '../../hooks/useAuth';
import ReviewModal from '../ReviewModal/ReviewModal';
import { useState } from 'react';
import { ExpandMore } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

//TODO: build collapse bottom to trip summary card, make sure review modal will work for passengers (with correct props and everything), fix line 43 so it returns a button whose onclick is to show the passengers instead, maybe make a new component for this
//once this is complete: test, debug, then commit it. making it pretty can happen later.
//* then focus on debugging photo issue, we're so close!!! work on these two issues as much as possible, if successful add the photo to the check-in cards; code freeze at 4pm
//? then practice presentation and seed db. minor styling changes allowed only if time permits. 

const TripSummaryCard = (props) => {

    const { getSingleTrip } = useContext(TripContext);
    const { loadPerson, pastReviews } = useContext(PersonContext);
    const [user, token] = useAuth()
    const navigate = useNavigate()
    const [showPassengers, setShowPassengers] = useState(false);
    const [isUserTheDriver, setIsUserTheDriver] = useState(false);
    const [reviewedPassengers, setReviewedPassengers] = useState([]);

    function handleClick(){
        getSingleTrip(props.trip.id)
    }


    const getReviewStatus = (trip) => {
        let isReviewCompleted = determineCompletedReview(trip);
        if(isReviewCompleted){
            return null;
        }else if (trip.driver.id === user.id){
            return <Button variant="contained" onClick={()=> setShowPassengers(true)}>Review</Button>
        }
        else {return <ReviewModal trip={props.trip} isDriver={true} reviewRecipient={props.trip.driver}/>}
    }

    const checkForReviewOfDriver = (trip) => {
        pastReviews.map((review) => {
            if (review.trip === trip.id){
                return <ReviewModal trip={props.trip} isDriver={true} reviewRecipient={props.trip.driver}/>
            }
        })
    }

    const getListOfReviewedPassengers = (trip) => {
        console.log(pastReviews[0]);
        let reviewedPassengers = pastReviews.map((review) => {
            if(review.trip === trip.id && !review.is_driver){
                return review.review_recipient;
            }
        })
        return reviewedPassengers;
    }

    const determineCompletedReview = (trip) => {
        let reviewCompleted = false; 
        let incompleteReviews = 0;
        pastReviews.map((review)=>{
            if (review.trip===trip.id && review.reviewer === user.id && trip.driver.id != user.id){
                reviewCompleted = true;
            }
            else if (review.trip===trip.id && review.reviewer === user.id && trip.driver.id === user.id){
                incompleteReviews ++;
            }
        })
        if (!reviewCompleted){
            if (trip.passengers.length === incompleteReviews){
                reviewCompleted = true;
            }
        }
        return reviewCompleted;
    }

    useEffect(() => {
          setIsUserTheDriver(props.trip.driver.id===user.id);
        }, []);

    useEffect(() => {
          setReviewedPassengers(getListOfReviewedPassengers(props.trip));
        }, [pastReviews]);

    return ( 
        <Box boxShadow={7} marginBottom={2} borderRadius={40} sx={{ maxWidth: 800 }}>

                <CardHeader
                    sx={{pb: 0}}
                    avatar={<Avatar sx={{ bgcolor: props.trip.driver.avatar_color }} aria-label="driver" onClick={()=>loadPerson(props.trip.driver.id)}>{props.trip.driver.first_name[0].toUpperCase()}</Avatar>}
                    action={isUserTheDriver ? null : checkForReviewOfDriver(props.trip)}
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
                        {(isUserTheDriver && props.trip.passengers.length > 0) &&
                        <Fragment>
                            <CardActions disableSpacing>
                                <Button color="success" onClick={()=>setShowPassengers(!showPassengers)}>Passengers <ExpandMore
                                    expand={showPassengers}
                                    aria-label="show more"
                                    >
                                    <ExpandMoreIcon />
                                    </ExpandMore></Button>
                            </CardActions>
                            <CardContent>
                            <Collapse in={showPassengers} timeout="auto" unmountOnExit>
                                {props.trip.passengers.map((tripPassenger, index)=>{
                                    return(<ListItem
                                    key={index}
                                    // onClick={()=>loadPerson(tripPassenger.passenger.id)}
                                    secondaryAction={
                                        reviewedPassengers.includes(tripPassenger.passenger.id) ? null :
                                        <ReviewModal edge="end" reviewRecipient={tripPassenger.passenger} isDriver={false} trip={props.trip}/>
                                    }
                                    disablePadding
                                >{tripPassenger.passenger.first_name}</ListItem>)
                                })}
                            </Collapse>
                        </CardContent>
                    </Fragment>}


        </Box>

    );
}
 
export default TripSummaryCard;

