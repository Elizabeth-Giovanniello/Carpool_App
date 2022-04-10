import React, { useContext } from 'react';
import { Container, Form } from 'react-bootstrap';
import { useFormControl } from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import DateAdapter from '@mui/lab/AdapterDateFns';
import MobileDatePicker from '@mui/lab/MobileDatePicker';

import { useNavigate } from 'react-router-dom';


import useCustomForm from '../../hooks/useCustomForm';
import { CalendarEventFill, ClockFill, GeoAltFill, GeoFill } from 'react-bootstrap-icons';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { Button, MenuItem, Select, Stack, TextField } from '@mui/material';
import { LocalizationProvider, MobileTimePicker } from '@mui/lab';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import { addRidePath } from '../../constants/apiPaths';
import TripContext from '../../context/TripContext';

const TripForm = (props) => {

    const { setTrip, setShowAddTripModal } = useContext(TripContext);

    const initialValues = {
        departure_date: null,
        departure_time: null,
        arrival_city: "",
        departure_city: "",
        total_passenger_seats: 1,
        seat_price: ""
    };

    const [user, token] = useAuth()
    const navigate = useNavigate()
    const [formData, handleInputChange, handleSubmit] = useCustomForm(initialValues, listNewRide)

    async function listNewRide(){
        console.log(formData.departure_date)
        try {
            let response = await axios.post(addRidePath, formData, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            console.log(response.data)
            setShowAddTripModal(false)
            setTrip(response.data);
            navigate("/details");
        } catch (error) {
            console.log(error.message)
        }
    }

    console.log(formData);
    return ( 
        <Container>
            <form onSubmit={handleSubmit} id="add-trip">
                <Stack spacing={3}>

                    <TextField
                        label="Departure city"
                        id="departure-city"
                        name="departure_city"
                        value={formData.departure_city}
                        onChange={handleInputChange}
                        sx={{ m: 1, width: '25ch' }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><GeoAltFill/></InputAdornment>,
                        }}
                    />
                    <TextField
                        label="Arrival city"
                        id="arrival-city"
                        name="arrival_city"
                        value={formData.arrival_city}
                        onChange={handleInputChange}
                        sx={{ m: 1, width: '25ch' }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><GeoAltFill/></InputAdornment>,
                        }}
                    />
                    <TextField
                        type="number"
                        label="Seats"
                        name="total_passenger_seats"
                        value={formData.total_passenger_seats}
                        onChange={handleInputChange}
                        sx={{ m: 1, width: '11ch' }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><AirlineSeatReclineNormalIcon/></InputAdornment>
                        }}
                    >
                    </TextField>
                    <TextField
                        label="Price per seat"
                        id="seat-price"
                        name="seat_price"
                        value={formData.seat_price}
                        onChange={handleInputChange}
                        sx={{ m: 1, width: '25ch' }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                    />
                    <LocalizationProvider dateAdapter={DateAdapter}>
                        <MobileDatePicker
                            views={['day']}
                            label="Departure date"
                            name="departure_date"
                            inputFormat="MM/dd/yyyy"
                            value={formData.departure_date}
                            onChange={(date) => handleInputChange( { target: { name: 'departure_date', value: new Date(date).toDateString() } } )}
                            renderInput={(params) => <TextField {...params} value={formData.departure_date} 
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><CalendarEventFill/></InputAdornment>,
                                }}/>}
                        />
                        <MobileTimePicker
                            name="departure_time"
                            label="Departure time"
                            value={formData.departure_time}
                            onChange={(time) => handleInputChange( { target: { name: 'departure_time', value: Date.parse(time) } } )}
                            renderInput={(params) => <TextField {...params} value={formData.departure_time}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><ClockFill/></InputAdornment>,
                                }}/>}
                        />
                    </LocalizationProvider>
                </Stack>
            </form>
        </Container>
    );
}
 
export default TripForm;

