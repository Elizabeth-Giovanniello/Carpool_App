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
import { CardHeader } from '@mui/material';
import { getDate, getTime } from '../../helpers/helpers';
import ReviewModal from '../ReviewModal/ReviewModal';
import useAuth from '../../hooks/useAuth'; 
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const RideSummaryCard = (props) => {

    const [user, token] = useAuth();

    return ( 
        <Card sx={{ minWidth: 275, mb: 1 }}>
        <CardHeader
            sx={{pb: 0}}
            title={
                    <Typography variant="h5" component="div">
                    Driver: {props.trip.driver.id === user.id ? "You" : props.trip.driver.first_name}
                    </Typography>}
                    subheader={<Typography sx={{ ml: 2, mt: 1, fontSize: 14 }} color="text.secondary">{getDate(props.trip.departure_date)}</Typography>
                    
                }
        >

        </CardHeader>

            <CardContent sx={{pb: 0}}>
                <Box display={'flex'} alignItems="center" justifyContent="center">
                    <Typography variant="h6">{props.trip.departure_city}</Typography>
                    <ArrowForwardIcon variant="h6"/>
                    <Typography variant="h6">{props.trip.arrival_city}</Typography>
                </Box>
            </CardContent>

  </Card>
     );
}
 
export default RideSummaryCard;