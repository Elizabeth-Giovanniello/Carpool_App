import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import React, { Fragment, useContext } from 'react';
import PersonContext from '../../context/PersonContext';
import TripContext from '../../context/TripContext';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from "react-router-dom";


const LoggedInTripInfo = (props) => {

    const { selectedTrip, getSingleTrip, setTrip } = useContext(TripContext);
    const navigate = useNavigate();
    const { loadPerson } = useContext(PersonContext);
    const [user, token] = useAuth()

    return ( 
        <>
            {!props.passengerIDs.includes(user.id) && 
                <TableRow>
                        <TableCell>Price:</TableCell>
                        <TableCell>${selectedTrip.seat_price}</TableCell>
                </TableRow>}



            {props.passengerIDs.includes(user.id) ? 
            <Fragment>
                <TableRow>
                        <TableCell>Your total due:</TableCell>
                        <TableCell>${selectedTrip.seat_price * props.userReservedSeats}</TableCell>
                </TableRow>
                <TableRow>
                        <TableCell>Your spots reserved:</TableCell>
                        <TableCell>{props.userReservedSeats}</TableCell>
                </TableRow>
                <TableRow>
                        <TableCell>Driver contact:</TableCell>
                        <TableCell>{selectedTrip.driver.phone_number}</TableCell>
                </TableRow>
                {/* <TableRow>
                        <TableCell>Other booked passengers:</TableCell>
                        <TableCell>{}</TableCell>
                </TableRow> */}
            </Fragment> : null}

        </>

            // {user && selectedTrip.driver.id === user.id || props.passengerIDs.includes(user.id) && 
            //     <TableRow>
            //         <TableCell>Meeting location:</TableCell>
            //         <TableCell>{}</TableCell>
            //     </TableRow>}
     );
}
 
export default LoggedInTripInfo;