import React from 'react';
//TODO: figure out why bootstrap wont' import Card

const DisplayCheckIns = (props) => {
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