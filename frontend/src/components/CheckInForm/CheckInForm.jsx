import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useCustomForm from '../../hooks/useCustomForm';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { Button, Stack, TextField } from '@mui/material';


const CheckInForm = (props) => {

    const initialValues = {
        description: "",
        timestamp: null, //TODO: add timestamp to table and figure out date fns to get time stamp along with location upon submission
    };

    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    const [finalFormData, setFinalFormData] = useState(initialValues);
    const [hasLocationError, setHasLocationError] = useState(false);


    const [user, token] = useAuth()
    const navigate = useNavigate()
    const [formData, handleInputChange, handleSubmit] = useCustomForm(initialValues, checkIn)

    async function checkIn(){
        getCheckInLocation();
        setFinalFormData({...formData, latitude: latitude, longitude: longitude})
        try {
            let response = await axios.post("INSERT CHECKIN PATH HERE", finalFormData, {
                headers: {
                    Authorization: 'Bearer' + token
                }
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    function getCheckInLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const pos = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                };
      
                setLatitude(pos.lat);
                setLongitude(pos.lng);
              },
              () => {
                setHasLocationError(true);
              }
            );
        } else {
            setHasLocationError(true);
        }
    }

    

    console.log(formData);
    return ( 
        <Container>
            <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    //TODO: add logic for when it fails to grab location (like maybe have option to place pin on map appear)
                    <TextField
                        label="Leave a comment/description to help others find you"
                        id="check-in-description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        sx={{ m: 1, width: '25ch' }}
                    />
                    <Button type="submit" variant="contained">Check in</Button>
                </Stack>
            </form>
        </Container>
    );
}
 
export default CheckInForm;

