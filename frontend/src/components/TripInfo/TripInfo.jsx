import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext } from 'react';
import TripContext from '../../context/TripContext';

const TripInfo = (props) => {

    const { selectedTrip } = useContext(TripContext);

    console.log(selectedTrip);
//TODO: come back and make this pretty
//TODO: add customizable info components based on if the person is a driver, passenger, neither, pre/post-trip, etc.
    return ( 

    <Box>
        <p>Driver: {selectedTrip.driver.first_name}</p>
        <p>Departure Date: {selectedTrip.departure_date}</p>
        <p>Departure Time: {selectedTrip.departure_time}</p>
        <p>Departure City: {selectedTrip.departure_city}</p>
        <p>Destination: {selectedTrip.arrival_city}</p>
        {/* <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="trip info">
        <TableRow>
            <TableHead>
                <TableCell>Driver:</TableCell>
            </TableHead>
            <TableBody>
                <TableCell>{selectedTrip.driver.first_name}</TableCell>
            </TableBody>
        </TableRow>
        <TableRow>
            <TableHead>
                <TableCell>Departure date:</TableCell>
                </TableHead>
            <TableBody>
                <TableCell>{selectedTrip.departure_date}</TableCell>
            </TableBody>
        </TableRow>
        <TableRow>
            <TableHead>
                <TableCell>Departure time:</TableCell>
                </TableHead>
            <TableBody>
                <TableCell>{selectedTrip.departure_time}</TableCell>
            </TableBody>
        </TableRow>
        <TableRow>
            <TableHead>
                <TableCell>Departure city:</TableCell>
                </TableHead>
                <TableBody>

            <TableCell>{selectedTrip.departure_city}</TableCell>
                </TableBody>
        </TableRow>
        <TableRow>
            <TableHead>
                <TableCell>Destination:</TableCell>
                </TableHead>
            <TableBody>
                <TableCell>{selectedTrip.arrival_city}</TableCell>
            </TableBody>
        </TableRow>
      </Table>
    </TableContainer> */}
    </Box>
     );
}
 
export default TripInfo;