import axios from 'axios';
import React from 'react';
import { Card } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';

const DisplayCheckIns = (props) => {

    const [user, token] = useAuth()

    async function editCheckIn(checkInID, checkInData) {
		let response = await axios.put(editCheckIn(checkInID), checkInData, {
			headers: {
				Authorization: 'Bearer' + token
			}
		})
			.then(response => {
				console.log(response);
				props.getCheckIns();
			})
			.catch(error => {
				console.log(error.response);
			});
	}


    return ( 
        props.checkIns.map(function(checkIn){
            return(
                <Card border="secondary" style={{ width: '18rem' }}>
                    <Card.Header>Driver/Passenger</Card.Header> //TODO: Make this an actual variable
                    <Card.Body>
                    <Card.Title>{checkIn.sender.firstName}</Card.Title>
                    <Card.Text>
                        <small className='text-muted'>{props.checkIn.timestamp}</small> //TODO: add timestamp to database and add logic to convert this to something readable
                        {checkIn.description}
                    </Card.Text>
                    </Card.Body>
                </Card>
            );
        })
    );
}
 
export default DisplayCheckIns;