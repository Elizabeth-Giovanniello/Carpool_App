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
import { Rating } from '@material-ui/lab';
import { submitReviewPath } from '../../constants/apiPaths';
import { FormatIndentDecreaseSharp } from '@mui/icons-material';

const ReviewForm = (props) => {

    const initialValues = {
        rating: "",
        comment: "",
    };

    const [user, token] = useAuth()
    const navigate = useNavigate()
    const [formData, handleInputChange, handleSubmit] = useCustomForm(initialValues, submitReview)

    async function submitReview(tripID, review_recipient, is_driver){
        try {
            let response = await axios.post(submitReviewPath, {trip: tripID, review_recipient: review_recipient, is_driver: is_driver, rating: parseInt(formData.rating), comment: formData.comment }, {
                headers: {
                    Authorization: 'Bearer' + token
                }
            })
            console.log(response);
            navigate("/")
        } catch (error) {
            console.log(error.message);
        }
    }

    console.log(formData);
    return ( 
        <div>
        <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
                <Rating name="rating" precision={0.5} value={formData.rating} size={'large'} onChange={handleInputChange}/>
                <TextField
                    label={`Your review of Driver Name`}
                    id="review-comment"
                    name="comment"
                    value={formData.comment}
                    onChange={handleInputChange}
                    sx={{ m: 1, width: '25ch' }}/>
                <Button type="submit">SUBMIT</Button>
            </Stack>
        </form>
        </div>
    );
}
 
export default ReviewForm;