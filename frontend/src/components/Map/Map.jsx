import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, { Component, useContext, useEffect, useState } from 'react';
import { GOOGLE_MAPS_API_KEY } from '../../constants/apiKeys';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import TripContext from '../../context/TripContext';
import { Avatar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { geocodeByAddress, geocodeByPlaceId, getLatLng, } from 'react-places-autocomplete';

 
export const MapContainer =(props) =>{

  const { checkIns, selectedTrip } = useContext(TripContext);

    const [showingInfoWindow, setShowingInfoWindow] = useState(false);
    const [activeMarker, setActiveMarker] = useState({});
    const [selectedPlace, setSelectedPlace] = useState({});
    const [meetingCoords, setMeetingCoords] = useState();
   
    const onMarkerClick = (props, marker, e) => {
        setSelectedPlace(props);
        setActiveMarker(marker);
        setShowingInfoWindow(true);
    }

   
   
    const onMapClicked = (props) => {
      if (showingInfoWindow) {
          setShowingInfoWindow(false);
          setActiveMarker(null);
      }
    };

    const getMeetingCoords = (address) => {
      geocodeByAddress(address)
          .then(results => getLatLng(results[0]))
          .then(latLng => setMeetingCoords(latLng))
          .catch(error => console.error('Error', error));
    }

    
    useEffect(() => {
      getMeetingCoords(selectedTrip.departure_city)
    }, []);
  
   
      return (

        <div>
          {meetingCoords &&
            <Map google={props.google}
                initialCenter={{
                    lat: meetingCoords.lat,
                    lng: meetingCoords.lng
                }}
                center={{
                  lat: meetingCoords.lat,
                  lng: meetingCoords.lng
                }}
                zoom={5}
                style={{width: '30rem', height: '50%'}}
                // containerStyle={{width: '100%', height: '100%'}}
                >
            {meetingCoords &&
             <Marker onClick={onMarkerClick}
                position={{lat: meetingCoords.lat, lng: meetingCoords.lng}} 
                name={'Meeting location'} />
            }
            {checkIns.map(function(checkIn){
              return (
                <Marker onClick={onMarkerClick}
                position={{lat: checkIn.latitude, lng: checkIn.longitude}}
                name={<Box  sx={{
                  display: 'flex', p: 0}}><Avatar sx={{ bgcolor: checkIn.sender.avatar_color, width: 24, height: 24, mr: 1}} aria-label="sender"><Typography variant='body2'>{checkIn.sender.first_name[0].toUpperCase()}</Typography></Avatar><Typography variant='body2' sx={{ my: 1, ml: 1 }}>{checkIn.sender.first_name}</Typography></Box>}/>
              );
            })}
            <InfoWindow
                marker={activeMarker}
                visible={showingInfoWindow}>
                <div>
                    <h1>{selectedPlace.name}</h1>
                </div>
            </InfoWindow> 
            
            </Map>}
        </div>
  
      );
  }
 
export default GoogleApiWrapper({
  apiKey: GOOGLE_MAPS_API_KEY
})(MapContainer);