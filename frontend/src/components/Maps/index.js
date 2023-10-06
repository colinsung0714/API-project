import { useSelector } from 'react-redux';
import { useJsApiLoader } from '@react-google-maps/api';
import { Maps } from './Maps';
import { useEffect, useState } from 'react';

const MapContainer = ({ spot, type, booking, currentUserLocation, setDistance, setDuration}) => {
  const apiKey = useSelector((state) => state.maps.key);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
    libraries: ['places']
  });
  const [currentUserAddress, setCurrentUserAddress] = useState('')
  const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${currentUserLocation?.lat},${currentUserLocation?.lng}&key=${apiKey}`;
  useEffect(() => {
    if(currentUserLocation) {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
      
        if (data.status === 'OK' && data.results.length > 0) {
           setCurrentUserAddress(data.results[0].formatted_address)
          
        } 
      })
    }
  }, [currentUserAddress, currentUserLocation])
  if (!apiKey) {
    return null;
  }
  return (<>
    {isLoaded && <Maps spot={spot} type={type} booking={booking} currentUserAddress={currentUserAddress} setDistance={setDistance} setDuration={setDuration}/>}
  </>
  );
};

export default MapContainer;