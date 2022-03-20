import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PlacesAutocomplete from 'react-places-autocomplete';
import useCustomForm from '../../hooks/useCustomForm';
import { geocodeByAddress, geocodeByPlaceId, getLatLng, } from 'react-places-autocomplete';
import { GOOGLE_MAPS_API_KEY } from '../../constants/apiKeys';
import { GoogleApiWrapper } from 'google-maps-react';
import { Autocomplete, TextField } from '@mui/material';

const SearchBar = (props) => {

    const [address, setAddress] = useState('');

    const [value, setValue] = useState(null);
    const [inputValue, setInputValue] = useState("");

    const handleChange = address => setAddress(address);

    const handleSelect = address => {
        geocodeByAddress(address)
          .then(results => getLatLng(results[0]))
          .then(latLng => console.log('Success', latLng))
          .catch(error => console.error('Error', error));
      };

    return ( 
        <>
        <PlacesAutocomplete
            value={address}
            onChange={handleChange}
            onSelect={handleSelect}
        >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) =>(
                <div>
                    <input
                        {...getInputProps({
                            placeholder: 'Search Places...',
                            className: 'location-search-input',
                        })}
                    />
                    <div className='autocomplete-dropdown-container'>
                        {loading && <div>Loading...</div>}
                        {suggestions.map(suggestion => {
                            const className = suggestion.active
                                ? 'suggestion-item--active'
                                : 'suggestion-item';
                            const style = suggestion.active
                                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                : { backgroundColor: '#ffffff', cursor: 'pointer' };
                            return (
                                <div
                                    {...getSuggestionItemProps(suggestion, {
                                        className,
                                        style,
                                    })}
                                >
                                    <span>{suggestion.description}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </PlacesAutocomplete>

        <PlacesAutocomplete
    >
            {({ suggestions }) =>(
                <Autocomplete
                
                freeSolo
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                    console.log(`value: ${value}, input value: ${inputValue}, sugggestions: ${suggestions}`)
                }}
                    options={suggestions.map(suggestion => suggestion.description)}
                    renderInput={(params) => (
                        <TextField
                        {...params}
                        label="Departure location"
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                        }}
                        />
                    )}/>
        
            )}
    </PlacesAutocomplete>
    </>
     );
}
 
export default GoogleApiWrapper({
    apiKey: GOOGLE_MAPS_API_KEY
  })(SearchBar);