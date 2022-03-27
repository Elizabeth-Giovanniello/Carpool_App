import React from 'react';
import useCustomForm from '../../hooks/useCustomForm';

import InputAdornment from '@mui/material/InputAdornment';
import DateAdapter from '@mui/lab/AdapterDateFns';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import { CalendarEventFill, ClockFill, GeoAltFill, GeoFill } from 'react-bootstrap-icons';

import { Box, Button, TextField } from '@mui/material';
import { LocalizationProvider, MobileTimePicker } from '@mui/lab';


const RideSearchBar = (props) => {

    const initialValues = {
        departureCity: "",
        arrivalCity: "",
        departureDate: null
    };

    const [formData, handleInputChange, handleSubmit] = useCustomForm(initialValues, props.searchTrips)
    console.log(formData)
    return ( 
        <form onSubmit={handleSubmit}>
            <Box   sx={{
                display: 'flex',
                justifyContent: 'center',
                p: 1,
                m: 1,
                bgcolor: 'info',
                borderRadius: 1,
                flexWrap: 'wrap'
                }}>
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
                                onChange={(date) => handleInputChange( { target: { name: 'departureDate', value: new Date(date).toDateString() } } )}
                                renderInput={(params) => <TextField {...params} value={formData.departureDate} 
                                sx={{ m: 1, width: '25ch' }}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"><CalendarEventFill/></InputAdornment>,
                                    }}/>}
                            />
                        </LocalizationProvider>
                        <Button type="submit" variant="contained" sx={{my: 2}}>Search</Button>
            </Box>
        </form>
     );
}
 
export default RideSearchBar;