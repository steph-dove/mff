import React, { useContext, useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { LocationContext } from '../LocationProvider/LocationContext';
import './Map.css';

const containerStyle = {
  width: '600px',
  height: '600px'
};

function Map() {
  const { locations } = useContext(LocationContext);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  })

  const [activeMarker, setActiveMarker] = useState(null);
  const { setMap, mapCenter } = useContext(LocationContext);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds({
      lat: 37.773972,
      lng: -122.431297
    });
    map.fitBounds(bounds);
    map.setZoom(13);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }

    setActiveMarker(marker);
  };

  const getInfoWindow = (location) => {
    if (activeMarker === location.locationid) {
      return (
        <InfoWindow onCloseClick={() => setActiveMarker(null)}>
          <div>{location.locationid}</div>
        </InfoWindow>
      );
    }
    return null
  };

  return isLoaded ? (
     <div className='Map'>
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={mapCenter}
            zoom={13}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            {locations.map(location =>  {
              const myLatlng = new google.maps.LatLng(parseFloat(location.latitude),parseFloat(location.longitude));
              return (
                <Marker
                  key={location.locationid}
                  name={location.locationid}
                  position={myLatlng}
                  onClick={() => handleActiveMarker(location.locationid)}
                  >
                    {getInfoWindow(location)}
                </Marker>
            )})}
        </GoogleMap>
      </div>
  ) : <></>
}

export default React.memo(Map)