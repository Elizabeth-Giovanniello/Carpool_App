import React from 'react';
import { Container, Form } from 'react-bootstrap';
import { useFormControl } from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import DateAdapter from '@mui/lab/AdapterMoment';
import MobileDatePicker from '@mui/lab/MobileDatePicker';

import { useNavigate } from 'react-router-dom';


import useCustomForm from '../../hooks/useCustomForm';
import { GeoAltFill, GeoFill } from 'react-bootstrap-icons';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { Button, Stack, TextField } from '@mui/material';
import { LocalizationProvider, MobileTimePicker } from '@mui/lab';

const TripForm = (props) => {

    const initialValues = {
        departureDate: "",
        departureTime: "2018-01-01T00:00:00.000Z",
        arrivalCity: "",
        departureCity: "",
        availableSeats: 0,
        seatPrice: "",
        car: ""
    };

    const [user, token] = useAuth()
    const navigate = useNavigate()
    const [formData, handleInputChange, handleSubmit] = useCustomForm(initialValues, listNewRide)

    async function listNewRide(){
        try {
            let response = await axios.post("http://127.0.0.1:8000/api/trips/create/", formData, {
                headers: {
                    Authorization: 'Bearer' + token
                }
            })
            navigate("/")
        } catch (error) {
            console.log(error.message)
        }
    }

    console.log(formData);
    return ( 
        <Container>
            <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    <TextField
                        label="Price per seat"
                        id="seat-price"
                        name="seatPrice"
                        value={formData.seatPrice}
                        onChange={handleInputChange}
                        sx={{ m: 1, width: '25ch' }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                    />

                    <TextField
                        label="Departure city"
                        id="departure-city"
                        name="departureCity"
                        value={formData.departureCity}
                        onChange={handleInputChange}
                        sx={{ m: 1, width: '25ch' }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><GeoAltFill/></InputAdornment>,
                        }}
                    />
                    <TextField
                        label="Arrival city"
                        id="arrival-city"
                        name="arrivalCity"
                        value={formData.arrivalCity}
                        onChange={handleInputChange}
                        sx={{ m: 1, width: '25ch' }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><GeoAltFill/></InputAdornment>,
                        }}
                    />
                    <LocalizationProvider dateAdapter={DateAdapter}>
                        <MobileDatePicker
                            views={['day']}
                            label="Departure date"
                            name="departureDate"
                            inputFormat="MM/dd/yyyy"
                            value={formData.departureDate}
                            onChange={handleInputChange}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <MobileTimePicker
                            name="departureTime"
                            label="Departure time"
                            value={formData.departureTime}
                            onChange={handleInputChange}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <Button type="submit">ADD TRIP</Button>
                </Stack>
            </form>
        </Container>
    );
}
 
export default TripForm;