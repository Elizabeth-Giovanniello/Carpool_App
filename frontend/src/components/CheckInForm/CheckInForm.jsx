import React, { useContext, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useCustomForm from '../../hooks/useCustomForm';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { Button, Stack, TextField } from '@mui/material';
import { sendCheckInPath } from '../../constants/apiPaths';
import TripContext from '../../context/TripContext';


const CheckInForm = (props) => {

    const initialValues = {
        trip: props.trip,
        description: ""
    };

    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [hasLocationError, setHasLocationError] = useState(false);
    const { selectedTrip, getCheckIns, checkIns } = useContext(TripContext);


    const [user, token] = useAuth()
    const navigate = useNavigate()
    const [formData, handleInputChange, handleSubmit] = useCustomForm(initialValues, checkIn)

    async function checkIn(){
        console.log(longitude);
        try {
            let response = await axios.post(sendCheckInPath, {...formData, ['latitude']: 40.951627, ['longitude']: -73.6214938}, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            getCheckIns(props.trip);
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getCheckInLocation();
    }, []);

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
                console.log(latitude);
              },
              () => {
                setHasLocationError(true);
              }
            );
        } else {
            setHasLocationError(true);
        }
    }

    
    //TODO: add logic for when it fails to grab location (like maybe have option to place pin on map appear)

    console.log(formData);
    return ( 
        <Container>
            <form onSubmit={handleSubmit} id="check-in">
                <Stack spacing={3}>
                    <TextField
                        multiline
                        rows={5}
                        label="Add a message or description to help others find you"
                        id="check-in-description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                </Stack>
            </form>
        </Container>
    );
}
 
export default CheckInForm;

