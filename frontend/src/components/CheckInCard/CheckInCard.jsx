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
import { getTime } from '../../helpers/helpers';

const CheckInCard = ({props, checkIn}) => {

    const { selectedTrip } = useContext(TripContext);

    return ( 
        // <Card border="secondary" style={{ width: '18rem' }} className="float-end">
        //     <Card.Header>
        //         {selectedTrip.driver.id === checkIn.sender.id ? "Driver" : "Passenger"}
        //         <CheckInEditMenu checkIn={checkIn}/>
        //     </Card.Header>
        //     <Card.Body>
        //     <Card.Title>{checkIn.sender.first_name}</Card.Title>
        //     <Card.Text>
        //         <small className='text-muted'>{checkIn.timestamp}</small> 
        //         {checkIn.description}
        //     </Card.Text>
        //     </Card.Body>
        // </Card>
        <Card sx={{ minWidth: 275, mb: 1 }}>
            <CardHeader
                sx={{pb: 0}}
                action={<CheckInEditMenu checkIn={checkIn}/>}
                title={
                    <Box sx={{display: 'flex'}}>
                        <Typography variant="h5" component="div">
                        {checkIn.sender.first_name}
                        </Typography><Typography sx={{ ml: 2, mt: 1, fontSize: 14 }} color="text.secondary">{getTime(checkIn.timestamp)}</Typography></Box>}
                        subheader={<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {selectedTrip.driver.id === checkIn.sender.id ? "Driver" : "Passenger"}
                    </Typography>
                        
                    }
            >

            </CardHeader>
            {checkIn.description &&
                <CardContent sx={{pb: 0}}>
                    <Typography variant="body2">
                    {checkIn.description}
                    </Typography>
                </CardContent>
            }
      </Card>
     );
}
 
export default CheckInCard;