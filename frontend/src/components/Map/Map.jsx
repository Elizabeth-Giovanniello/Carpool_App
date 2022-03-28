import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, { Component, useContext, useState } from 'react';
import { GOOGLE_MAPS_API_KEY } from '../../constants/apiKeys';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import TripContext from '../../context/TripContext';
import { Avatar, Typography } from '@mui/material';
import { Box } from '@mui/system';

 
export const MapContainer =(props) =>{

  const { checkIns } = useContext(TripContext);

    const [showingInfoWindow, setShowingInfoWindow] = useState(false);
    const [activeMarker, setActiveMarker] = useState({});
    const [selectedPlace, setSelectedPlace] = useState({});
   
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
   
      return (

        <div>
            <Map google={props.google}
                initialCenter={{
                    lat: 40.854885,
                    lng: -88.081807
                }}
                center={{
                  lat: 40.854885,
                  lng: -88.081807
                }}
                zoom={5}
                style={{width: '30rem', height: '50%'}}
                // containerStyle={{width: '100%', height: '100%'}}
                >
             <Marker onClick={onMarkerClick}
                position={{lat: 37.778519, lng: -88.405640}} //TODO: replace these with variables for meeting spot (or at least departure city)
                name={'Meeting location'} />
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
            
            </Map>
        </div>
  
      );
  }
 
export default GoogleApiWrapper({
  apiKey: GOOGLE_MAPS_API_KEY
})(MapContainer);