import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { geocodeByAddress, geocodeByPlaceId, getLatLng } from 'react-places-autocomplete';

import InputAdornment from '@mui/material/InputAdornment';
import { GeoAltFill, GeoFill } from 'react-bootstrap-icons';
import { Button, Stack, TextField } from '@mui/material';



const PlacesSearchField = (props) => {
    return ( 
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
     );
}
 
export default PlacesSearchField;