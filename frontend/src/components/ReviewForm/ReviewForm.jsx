import React, { useContext } from 'react';
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
import { Rating } from '@material-ui/lab';
import { submitReviewPath } from '../../constants/apiPaths';
import { FormatIndentDecreaseSharp } from '@mui/icons-material';
import PersonContext from '../../context/PersonContext';

const ReviewForm = ({props, trip, isDriver=false }) => {

    const initialValues = {
        rating: "",
        comment: "",
    };

    const [user, token] = useAuth()
    const { getPastReviews } = useContext(PersonContext);
    const navigate = useNavigate()
    const [formData, handleInputChange, handleSubmit] = useCustomForm(initialValues, submitReview)

    async function submitReview(){
        try {
            let response = await axios.post(submitReviewPath, { trip: trip.id, review_recipient: trip.driver.id, is_driver: isDriver, rating: formData.rating, comment: formData.comment }, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            console.log(response);
            getPastReviews();
        } catch (error) {
            console.log(error.message);
        }
    }

    console.log(formData);
    return ( 
        <div>
        <form onSubmit={handleSubmit} id="review-form">
            <Stack spacing={3}>
                <Rating name="rating" precision={0.5} value={formData.rating} size={'large'} onChange={handleInputChange}/>
                <TextField
                    label={`Your review of ${trip.driver.first_name}`}
                    id="review-comment"
                    name="comment"
                    multiline
                    rows={5}
                    value={formData.comment}
                    onChange={handleInputChange}
                    fullWidth/>
            </Stack>
        </form>
        </div>
    );
}
 
export default ReviewForm;