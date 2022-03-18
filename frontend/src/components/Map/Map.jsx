import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, { Component, useState } from 'react';
import { GOOGLE_MAPS_API_KEY } from '../../constants/apiKeys';

 
export const MapContainer =(props) =>{

    const [showingInfoWindow, setShowingInfoWindow] = useState(false);
    const [activeMarker, setActiveMarker] = useState({});
    // const [selectedPlace, setSelectedPlace] = useState({});
   
    // const onMarkerClick = (props, marker, e) => {
    //     setSelectedPlace(props);
    //     setActiveMarker(marker);
    //     setShowingInfoWindow(true);
    // }

   
   
    // const onMapClicked = (props) => {
    //   if (showingInfoWindow) {
    //       setShowingInfoWindow(false);
    //     //   setActiveMarker(null);
    //   }
    // };
   
      return (

        <div>
            <Map google={props.google}
                initialCenter={{
                    lat: 40.854885,
                    lng: -88.081807
                }}
                zoom={15}
                style={{width: '400px', height: '400px', position: 'relative'}}>
             {/* <Marker onClick={onMarkerClick}
                    name={'Current location'} />
    
            <InfoWindow
                marker={activeMarker}
                visible={showingInfoWindow}>
                <div>
                    <h1>{selectedPlace.name}</h1>
                </div>
            </InfoWindow>  */}
            
            </Map>
        </div>
  
      );
  }
 
export default GoogleApiWrapper({
  apiKey: GOOGLE_MAPS_API_KEY
})(MapContainer);