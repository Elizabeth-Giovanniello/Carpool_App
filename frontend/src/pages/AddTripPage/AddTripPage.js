import React from 'react';
import { Container, Form } from 'react-bootstrap';
import { useFormControl } from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import DateAdapter from '@mui/lab/AdapterMoment';

import { useNavigate } from 'react-router-dom';


import useCustomForm from '../../hooks/useCustomForm';
import { GeoAltFill, GeoFill } from 'react-bootstrap-icons';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { TextField } from '@mui/material';

let initialValues = {
    departureDate: "",
    arrivalDate: "",
    departureTime: "",
    arrivalCity: "",
    departureCity: "",
    availableSeats: 0,
    seatPrice: "",
    car: ""
};

const AddTripPage = () => {
    const [user, token] =useAuth()
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

    return ( 
        <Container>
            <FormControl sx={{ width: '25ch' }}>
                <InputLabel htmlFor="departure-date">Departure date</InputLabel>
                <OutlinedInput 
                    id = "departure-date" 
                    value = {initialValues.departureDate} 
                    InputProps={{
                    startAdornment: <InputAdornment position="start"><GeoFill variant="danger"/></InputAdornment>,
                    }}
                />
            </FormControl>
            <FormControl fullWidth>
          <InputLabel htmlFor="seat-price">Set a price per seat</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={initialValues.seatPrice}
            // onChange={handleChange('amount')}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Seat price"
          />
        </FormControl>
        <TextField
          label="Departure city"
          id="outlined-start-adornment"
          sx={{ m: 1, width: '25ch' }}
          InputProps={{
            startAdornment: <InputAdornment position="start"><GeoAltFill/></InputAdornment>,
          }}
        />
        <TextField
          label="Arrival city"
          id="outlined-start-adornment"
          sx={{ m: 1, width: '25ch' }}
          InputProps={{
            startAdornment: <InputAdornment position="start"><GeoAltFill/></InputAdornment>,
          }}
        />
        <LocalizationProvider dateAdapter={DateAdapter}>
        <MobileDatePicker
          label="Date mobile"
          inputFormat="MM/dd/yyyy"
          value={initialValues.departureTime}
        //   onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
        </LocalizationProvider>
        </Container>
         );
}
 
export default AddTripPage;