import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Box } from '@mui/system';
import React, { Fragment, useContext } from 'react';
import PersonContext from '../../context/PersonContext';
import TripContext from '../../context/TripContext';
import useAuth from '../../hooks/useAuth';
import { format } from 'date-fns';
import { getDate, getTime } from '../../helpers/helpers';


const EdiitTripForm = (props) => {

    const { selectedTrip } = useContext(TripContext);
    const { loadPerson } = useContext(PersonContext);
    const [user, token] = useAuth()

    console.log(selectedTrip);

    const getUserSeats = () => {
        if(selectedTrip.passengers.length > 0){
            let seats = selectedTrip.passengers.filter((passengerInfo) => {
                return passengerInfo.passenger.id === user.id;
            })
            return seats[0].seats_booked;
        }
    }

    const userReservedSeats = getUserSeats();


    const date = new Date(selectedTrip.departure_date);
    console.log(`${format(date, 'dd/MM/yyyy')}`);
    console.log(date.getFullYear());



  
//TODO: come back and make this pretty
//TODO: add customizable info components based on if the person is a driver, passenger, neither, pre/post-trip, etc.
    return ( 

    <Box>
        {/* <p onClick={() => loadPerson(selectedTrip.driver.id)}>Driver: {selectedTrip.driver.first_name}</p>
        <p>Departure Date: {selectedTrip.departure_date}</p>
        <p>Departure Time: {selectedTrip.departure_time}</p>
        <p>Departure City: {selectedTrip.departure_city}</p>
        <p>Destination: {selectedTrip.arrival_city}</p> */}

        <TableContainer>
            <Table aria-label="trip info">
                <TableBody>
                    <TableRow>
                            <TableCell>Driver:</TableCell>
                            <TableCell>{selectedTrip.driver.first_name}</TableCell>
                    </TableRow>
                    <TableRow>
                            <TableCell>Departure date:</TableCell>
                            <TableCell>{getDate(selectedTrip.departure_date)}</TableCell>
                    </TableRow>
                    <TableRow>
                            <TableCell>Departure time:</TableCell>
                            <TableCell>{getTime(selectedTrip.departure_time)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Departure city:</TableCell>
                        <TableCell>{selectedTrip.departure_city}</TableCell>            
                    </TableRow>
                    <TableRow>
                            <TableCell>Destination:</TableCell>
                            <TableCell>{selectedTrip.arrival_city}</TableCell>
                    </TableRow>
                    <TableRow>
                            <TableCell>Ride status:</TableCell>
                            <TableCell>{}</TableCell>
                    </TableRow>
                    <TableRow>
                            <TableCell>Available seats:</TableCell>
                            <TableCell>{props.seats}</TableCell>
                    </TableRow>
        




                    {!user || !props.passengerIDs.includes(user.id) && 
                        <TableRow>
                                <TableCell>Price:</TableCell>
                                <TableCell>${selectedTrip.seat_price}</TableCell>
                        </TableRow>}




                    {props.passengerIDs.includes(user.id) && 
                    <Fragment>
                        <TableRow>
                                <TableCell>Your total due:</TableCell>
                                <TableCell>${selectedTrip.seat_price * userReservedSeats}</TableCell>
                        </TableRow>
                        <TableRow>
                                <TableCell>Your spots reserved:</TableCell>
                                <TableCell>{userReservedSeats}</TableCell>
                        </TableRow>
                        <TableRow>
                                <TableCell>Driver contact:</TableCell>
                                <TableCell>{selectedTrip.driver.phone_number}</TableCell>
                        </TableRow>
                        <TableRow>
                                <TableCell>Other booked passengers:</TableCell>
                                <TableCell>{}</TableCell>
                        </TableRow>
                    </Fragment>}


                    {selectedTrip.driver.id === user.id || props.passengerIDs.includes(user.id) && 
                        <TableRow>
                            <TableCell>Meeting location:</TableCell>
                            <TableCell>{}</TableCell>
                        </TableRow>}

                    {selectedTrip.driver.id === user.id &&
                    <Fragment>
                        <TableRow>
                            <TableCell>Passengers:</TableCell>
                            <TableCell>{}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Passenger contact:</TableCell>
                            <TableCell>{}</TableCell>
                        </TableRow>
                    </Fragment>}
                  


                </TableBody>
            </Table>
        </TableContainer>
    </Box>
     );
}
 
export default EdiitTripForm;