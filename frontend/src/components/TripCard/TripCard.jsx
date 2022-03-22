import React, { useContext } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActionArea, CardActions, Grid, Paper } from '@mui/material';
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

const TripCard = (props) => {

    const { setSelectedTrip } = useContext(TripContext);
    const navigate = useNavigate()

    function handleClick(){
        setSelectedTrip(props.trip);
        navigate("details/")
    }

    function randomColor() {
        let hex = Math.floor(Math.random() * 0xFFFFFF);
        let color = "#" + hex.toString(16);
        return color;
    }

    return ( 
        <Box boxShadow={7} marginBottom={2} borderRadius={40} sx={{ maxWidth: 800 }} onClick={handleClick}>

                <CardHeader
                    avatar={<Avatar sx={{ bgcolor: randomColor() }} aria-label="recipe">{props.trip.driver.firstName[0].toUpperCase()}</Avatar>}
                    action={<Button variant="contained" size="medium" color="secondary">Book</Button>}
                    title={<Box display={'flex'} alignItems={'center'} mb={0}>{props.trip.driver.firstName}</Box>}
                    subheader={<Box
                        display={'flex'}
                        alignItems={'center'}
                        mb={1}
                    >
                        <Rating name={'rating'} value={props.trip.driver.overallRating} size={'small'} precision={0.5} readOnly/>
                        <Typography variant={'body2'}>
                        {props.trip.driver.overallRating}
                        </Typography>
                    </Box>}
                />

                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={9}>
                                <Box display={'flex'} alignItems="center" justifyContent="center">
                                    <Typography variant="h6">{props.trip.departureCity}</Typography>
                                    <ArrowForwardIcon variant="h6"/>
                                    <Typography variant="h6">{props.trip.arrivalCity}</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography gutterBottom component="div" style={{color: 'green'}} marginBottom={0}>
                                    ${props.trip.seatPrice}
                                </Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <Box display={'flex'} alignItems={'center'}>
                                    <Typography gutterBottom component="div" style={{color: 'gray'}}>
                                        {props.trip.departureDate}
                                    </Typography>
                                    <Typography gutterBottom component="div" style={{color: 'gray'}}>
                                        , {props.trip.departureTime}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={3}>
                                <Box display={'flex'}>
                            <Typography>{props.trip.availableSeats}</Typography>
                                <AirlineSeatReclineNormalIcon fontSize='medium' style={{color: 'gray'}}/>
                                </Box>
                            </Grid>
                        </Grid>
                    </CardContent>


        </Box>

     );
}
 
export default TripCard;

