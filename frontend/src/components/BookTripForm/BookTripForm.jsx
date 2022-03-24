import { InputAdornment, MenuItem, TextField } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { bookRidePath } from '../../constants/apiPaths';
import useAuth from '../../hooks/useAuth';
import useCustomForm from '../../hooks/useCustomForm';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';

const BookTripForm = (props) => {


    const initialValues = {
        trip: props.trip.id,
        seats_booked: 1,
    };

    const [user, token] = useAuth()
    const navigate = useNavigate()
    const [formData, handleInputChange, handleSubmit] = useCustomForm(initialValues, bookRide)

    async function bookRide(){
        try {
            let response = await axios.post(bookRidePath, formData, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            console.log(response);
            navigate("/details")
        } catch (error) {
            console.log(error.message);
            alert('Something went wrong');
        }
    }

    function generateSeatNumberOptions(){
        let seats = []
        for(let i=0; i < props.seats; i++){
            seats.push(<MenuItem value={i+1}>{i+1}</MenuItem>)
        }
        return seats;
    }

    console.log(formData);
    //TODO: refactor logic so that availabe seats are calculated by subtracting already booked seats from total

    //TODO: if no payment api, then figure out a way to add payment preferences to db or something and list them? like cash, venmo, zelle, etc.
    return ( 
        <div>
        <form onSubmit={handleSubmit} id="reserve-trip">
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
                name="seats_booked"
                value={formData.seats_booked}
                onChange={handleInputChange}
                sx={{ m: 1, width: '11ch' }}
                InputProps={{
                    startAdornment: <InputAdornment position="start"><AirlineSeatReclineNormalIcon/></InputAdornment>
                }}
            >
                {generateSeatNumberOptions()}
            </TextField>
            <p>Summary: </p>
            <p>You are reserving {formData.seats_booked} seat(s) for a total of ${props.trip.seat_price * formData.seats_booked} to depart from {props.trip.departure_city} on {props.trip.departure_date}. You will make your payment directly to the driver on the day of your departure. It is recommended that you check in on your Ride Details page upon arriving at the designated meeting location on the day of your scheduled trip, so your driver and other passengers know you have arrived and can more easily find you.</p>
        </form>
        </div>
    );
}
 
export default BookTripForm;