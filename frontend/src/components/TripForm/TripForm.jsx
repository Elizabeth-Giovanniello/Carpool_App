import React from 'react';
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

const TripForm = (props) => {

    const initialValues = {
        departureDate: null,
        departureTime: null,
        arrivalCity: "",
        departureCity: "",
        availableSeats: 1,
        seatPrice: ""
    };

    const [user, token] = useAuth()
    const navigate = useNavigate()
    const [formData, handleInputChange, handleSubmit] = useCustomForm(initialValues, listNewRide)

    async function listNewRide(){
        console.log(addRidePath)
        try {
            let response = await axios.post(addRidePath, formData, {
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
                    <TextField
                        select
                        SelectProps={{
                            MenuProps: {
                                anchorOrigin: {
                                vertical: "bottom",
                                horizontal: "left"
                                }
                                }
                        }}
                        label="Seats"
                        name="availableSeats"
                        value={formData.availableSeats}
                        onChange={handleInputChange}
                        sx={{ m: 1, width: '11ch' }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><AirlineSeatReclineNormalIcon/></InputAdornment>
                        }}
                    >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={6}>6</MenuItem>
                        <MenuItem value={7}>7</MenuItem>
                        <MenuItem value={8}>8</MenuItem>
                        <MenuItem value={9}>9</MenuItem>
                    </TextField>
                    <LocalizationProvider dateAdapter={DateAdapter}>
                        <MobileDatePicker
                            views={['day']}
                            label="Departure date"
                            name="departureDate"
                            inputFormat="MM/dd/yyyy"
                            value={formData.departureDate}
                            onChange={(dateString) => handleInputChange( { target: { name: 'departureDate', value: dateString } } )}
                            renderInput={(params) => <TextField {...params} value={formData.departureDate} 
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><CalendarEventFill/></InputAdornment>,
                                }}/>}
                        />
                        <MobileTimePicker
                            name="departureTime"
                            label="Departure time"
                            value={formData.departureTime}
                            onChange={(timeString) => handleInputChange( { target: { name: 'departureTime', value: timeString } } )}
                            renderInput={(params) => <TextField {...params} 
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><ClockFill/></InputAdornment>,
                                }}/>}
                        />
                    </LocalizationProvider>
                    <Button type="submit" variant="contained">List ride</Button>
                </Stack>
            </form>
        </Container>
    );
}
 
export default TripForm;

