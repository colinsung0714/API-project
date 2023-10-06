import React, { useState, useRef, useEffect } from 'react';
import '../Maps/Maps.css'
import { periodStringReservation } from '../helper';
import { GoogleMap, Marker, InfoWindow, DirectionsRenderer } from '@react-google-maps/api';
const containerStyle = {
  width: '100%',
  height: '100%',
};

export const Maps = ({setDuration, setDistance, spot, type, booking, currentUserAddress }) => {
  const center = {
    lat: spot.lat || null,
    lng: spot.lng || null
  };
  const infoPosition = {
    lat:spot.lat,
    lng:spot.lng + 0.00075
  }
  const [icon, setIcon] = useState({
    url: "https://airbrb-project.s3.us-west-1.amazonaws.com/home-icon.png",
    // eslint-disable-next-line no-undef
    scaledSize: new google.maps.Size(35, 35),
    // eslint-disable-next-line no-undef
    origin: new google.maps.Point(0, 0),
    // eslint-disable-next-line no-undef
    anchor: new google.maps.Point(0, 0),
  });
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [map, setMap] = useState(/** @type google.maps.Map*/(null))
  const handleMouseOver = () => {
    setIcon({
      url: "https://airbrb-project.s3.us-west-1.amazonaws.com/airbnb-logo.png",
     
      // eslint-disable-next-line no-undef
      scaledSize: new google.maps.Size(35, 35),
      // eslint-disable-next-line no-undef
      origin: new google.maps.Point(0, 0),
      // eslint-disable-next-line no-undef
      anchor: new google.maps.Point(0, 0)
    });
  };
  
  const spotAddress = `${spot?.address}, ${spot?.city}, ${spot?.state}`
  const handleMouseOut = () => {
    setIcon({
      url: "https://airbrb-project.s3.us-west-1.amazonaws.com/home-icon.png",
      // eslint-disable-next-line no-undef
      scaledSize: new google.maps.Size(35, 35),
      // eslint-disable-next-line no-undef
      origin: new google.maps.Point(0, 0),
      // eslint-disable-next-line no-undef
      anchor: new google.maps.Point(0, 0)
    });
  };

  async function calculateRoute() {
    if(directionsResponse?.status) return;
 
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
        origin: currentUserAddress,
        destination: spotAddress,
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING,
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
    
}

useEffect(()=>{
 calculateRoute()
},[directionsResponse, currentUserAddress])
 
  const bookingPeriod = type === 'booking' ? periodStringReservation(booking.startDate, booking.endDate) : null
  return (
    <>
      { 
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
          onLoad={(map) => setMap(map)}
        >
         {!directionsResponse && <Marker position={center} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} title={spot.name} icon={icon} >
           { type === 'booking' && <InfoWindow position={infoPosition} >
              <div id='info-window-box'>
                 <div style={{fontWeight:"bold"}}>Where you're staying</div>
                 <div style={{fontSize:"10px"}}>{bookingPeriod}</div>
              </div>
            </InfoWindow> }
          </Marker>}
          {directionsResponse && (
                            <DirectionsRenderer directions={directionsResponse} />
                        )}
        </GoogleMap>
      }
    </>
  );
};
