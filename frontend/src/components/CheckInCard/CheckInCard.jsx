import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import TripContext from '../../context/TripContext';
import CheckInEditMenu from '../CheckInEditMenu/CheckInEditMenu';

const CheckInCard = ({props, checkIn}) => {

    const { selectedTrip } = useContext(TripContext);

    return ( 
        <Card border="secondary" style={{ width: '18rem' }} className="float-end">
            <Card.Header>
                {selectedTrip.driver.id === checkIn.sender.id ? "Driver" : "Passenger"}
                <CheckInEditMenu checkIn={checkIn}/>
            </Card.Header>
            <Card.Body>
            <Card.Title>{checkIn.sender.first_name}</Card.Title>
            <Card.Text>
                <small className='text-muted'>{checkIn.timestamp}</small> 
                {checkIn.description}
            </Card.Text>
            </Card.Body>
        </Card>
     );
}
 
export default CheckInCard;