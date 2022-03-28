import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { Fragment, useContext } from 'react';
import PersonContext from '../../context/PersonContext';
import TripContext from '../../context/TripContext';
import useAuth from '../../hooks/useAuth';
import { format } from 'date-fns';
import { getDate, getIsFutureDate, getIsPastDate, getTime } from '../../helpers/helpers';
import axios from 'axios';
import useCustomForm from '../../hooks/useCustomForm';
import { editRidePath } from '../../constants/apiPaths';
import { Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import DateAdapter from '@mui/lab/AdapterDateFns';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import { LocalizationProvider, MobileTimePicker } from '@mui/lab';
import CheckInModal from '../CheckInModal/CheckInModal';
import LoggedInTripInfo from '../LoggedInTripInfo/LoggedInTripInfo';

const TripInfo = (props) => {

    const { selectedTrip, getSingleTrip, setTrip } = useContext(TripContext);
    const navigate = useNavigate();
    const { loadPerson } = useContext(PersonContext);
    const [user, token] = useAuth()

    console.log(selectedTrip);

    const getUserSeats = () => {
        if(user){
            if(selectedTrip.passengers.length > 0){
                let seats = selectedTrip.passengers.filter((passengerInfo) => {
                    return passengerInfo.passenger.id === user.id;
                })
                return seats[0].seats_booked;
            }
        }else{return null}
    }

    const userReservedSeats = getUserSeats();


    const getRideStatus = (date) => {
        if(getIsFutureDate(date)){
            return 'Upcoming'
        }
        else if (getIsPastDate(date)){
            return 'Completed'
        }else {return 'Ongoing'}
    }

    const initialValues = {
        departure_date: selectedTrip.departure_date,
        departure_time: selectedTrip.departure_time,
        arrival_city: selectedTrip.arrival_city,
        departure_city: selectedTrip.departure_city,
        total_passenger_seats: selectedTrip.total_passenger_seats,
        seat_price: selectedTrip.seat_price
    };



    const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(initialValues, updateTripDetails)

    async function updateTripDetails(){
        try {
            let response = await axios.put(editRidePath(selectedTrip.id), formData, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            console.log(response.data)
            // setTrip(response.data);
            props.setIsInEditMode(false)
            // navigate('/details')
            getSingleTrip(selectedTrip.id);
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleSaveEdit = ()=>{
        updateTripDetails(formData);
        
    }

    const handleCancel = ()=>{
        props.setIsInEditMode(false);
        reset();
    }

    const revealCheckIn = ()=>{
        if(user){
            if(getRideStatus(selectedTrip.departure_date) === 'Ongoing'){
                if(props.passengerIDs.includes(user.id) || selectedTrip.driver.id === user.id){
                    return <CheckInModal/>
                }
            }
        }
    }



  
//TODO: come back and make this pretty
//TODO: add customizable info components based on if the person is a driver, passenger, neither, pre/post-trip, etc.
    return ( 

    <Box>
 
        <TableContainer>
            <Table aria-label="trip info" size="small">
                    <TableBody>
                        <TableRow onClick={() => loadPerson(selectedTrip.driver.id)}>
                                <TableCell>Driver:</TableCell>
                                <TableCell>{selectedTrip.driver.first_name}</TableCell>
                        </TableRow>
                        <LocalizationProvider dateAdapter={DateAdapter}>
                        <TableRow>
                                <TableCell>Departure date:</TableCell>
                        {props.isInEditMode ?
                        <MobileDatePicker
                            views={['day']}
                            name="departure_date"
                            inputFormat="MM/dd/yyyy"
                            value={formData.departure_date}
                            onChange={(date) => handleInputChange( { target: { name: 'departure_date', value: new Date(date).toDateString() } } )}
                            renderInput={(params) => <TextField {...params} value={formData.departure_date} fullWidth
                            variant='standard'/>}
                        /> :
                                <TableCell>{getDate(selectedTrip.departure_date)}</TableCell>}
                        </TableRow>
                        <TableRow>
                                <TableCell>Departure time:</TableCell>
                        {props.isInEditMode ?
                        <MobileTimePicker
                            name="departure_time"
                            value={formData.departure_time}
                            onChange={(time) => handleInputChange( { target: { name: 'departure_time', value: Date.parse(time) } } )}
                            renderInput={(params) => <TextField {...params} value={formData.departure_time} fullWidth variant='standard'/>}
                            
                        /> :
                                <TableCell>{getTime(selectedTrip.departure_time)}</TableCell>}
                        </TableRow>
                        </LocalizationProvider>
                        <TableRow>
                            <TableCell>Departure city:</TableCell>
                        {props.isInEditMode ?
                        <TextField
                            name="departure_city"
                            value={formData.departure_city}
                            onChange={handleInputChange}
                            fullWidth
                            variant='standard'
                        /> :
                            <TableCell>{selectedTrip.departure_city}</TableCell>}            
                        </TableRow>
                        <TableRow>
                            <TableCell>Destination:</TableCell>
                        {props.isInEditMode ?
                        <TextField
                            name="arrival_city"
                            value={formData.arrival_city}
                            onChange={handleInputChange}
                            fullWidth
                            variant='standard'
                        /> :
                                <TableCell>{selectedTrip.arrival_city}</TableCell>}
                        </TableRow>
                        <TableRow>
                                <TableCell>Ride status:</TableCell>
                                <TableCell>{getRideStatus(selectedTrip.departure_date)}</TableCell>
                        </TableRow>
                        {props.isInEditMode ?
                        <TableRow>
                            <TableCell>Passenger seats:</TableCell>
                            <TextField
                                name="total_passenger_seats"
                                value={formData.total_passenger_seats}
                                onChange={handleInputChange}
                                fullWidth
                                variant='standard'
                                type='number'
                            /> 
                        </TableRow> :
                        <TableRow>
                                <TableCell>Available seats:</TableCell>
                                <TableCell>{props.seats}</TableCell>
                        </TableRow>}
            




                      {user && <LoggedInTripInfo passengerIDs={props.passengerIDs} userReservedSeats={userReservedSeats}/>}

                        {/* {user && selectedTrip.driver.id === user.id &&
                        <Fragment>
                            <TableRow>
                                <TableCell>Passengers:</TableCell>
                                <TableCell>{}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Passenger contact:</TableCell>
                                <TableCell>{}</TableCell>
                            </TableRow>
                        </Fragment>} */}
                    


                    </TableBody>
            </Table>
        </TableContainer>
        {props.isInEditMode && 
        <Box sx={{my: 2, display: 'flex', justifyContent: 'flex-end'}}>
            <Button size='small' sx={{mr: 1.5}} variant='outlined' onClick={handleCancel}>cancel</Button>
            <Button size='small' variant='contained' onClick={()=>handleSaveEdit()}>save</Button>
        </Box>
        }
        {revealCheckIn() }
    </Box>
     );
}
 
export default TripInfo;