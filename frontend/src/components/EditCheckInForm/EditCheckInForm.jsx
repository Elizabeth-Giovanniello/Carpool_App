import React, { useContext, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useCustomForm from '../../hooks/useCustomForm';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { Button, Stack, TextField } from '@mui/material';
import { editCheckInPath } from '../../constants/apiPaths';
import TripContext from '../../context/TripContext';


const EditCheckInForm = ({props, checkIn}) => {

    const initialValues = {
        trip: checkIn.trip,
        description: checkIn.description,
        latitude: checkIn.latitude,
        longitude: checkIn.longitude,
    };

    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [finalFormData, setFinalFormData] = useState(initialValues);
    const [hasLocationError, setHasLocationError] = useState(false);
    const { selectedTrip, getCheckIns, checkIns } = useContext(TripContext);


    const [user, token] = useAuth()
    const navigate = useNavigate()
    const [formData, handleInputChange, handleSubmit] = useCustomForm(initialValues, editCheckIn)

    async function editCheckIn(){
        // getCheckInLocation();
        console.log(longitude);
        setFinalFormData({...formData, ['latitude']: latitude, ['longitude']: longitude})
        console.log(finalFormData);
        try {
            let response = await axios.put(editCheckInPath(checkIn.id), finalFormData, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            getCheckIns(checkIn.trip);
        } catch (error) {
            console.log(error.message)
        }
    }
    //TODO: figure out why setLatitude/setLongitude don't work within this function
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
            <form onSubmit={handleSubmit} id="edit-check-in">
                <Stack spacing={3}>
                    <TextField
                        multiline
                        rows={5}
                        label="Edit your message or description to help others find you"
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
 
export default EditCheckInForm;