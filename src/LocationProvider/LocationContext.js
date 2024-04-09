import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const LocationContext = createContext();

const LocationProvider = ({ children }) => {
    const [map, setMap] = React.useState(null)
    const [mapCenter, setMapCenter] = React.useState({ lat: 37.773972, lng: -122.431297 }) // San Francisco coordinates
    const [locations, setLocations] = useState([]);
    const [activeLocation, setActiveLocation] = useState(null);
    const [status, setStatus] = useState('approved');
    const [applicant, setApplicant] = useState('');
    const [address, setAddress] = useState('');
    const [latLng, setLatLng] = useState({ lat: 37.773972, lng: -122.431297 });

    const updateActiveLocation = (locationId) => {
        setActiveLocation(locationId);
    };
    
    const updateStatus = (newStatus) => {
        const options = ['APPROVED', 'ALL', 'DENIED', 'REQUESTED', 'SUSPEND', 'EXPIRED', 'ISSUED'];
        if (options.includes(newStatus)) {
            setStatus(newStatus);
        }
    }

    const updateApplicant = (newApplicant) => {
        if (safeString(newApplicant)) {
            setApplicant(newApplicant);
        }
    }

    const updateAddress = (newAddress) => { 
        if (safeString(newAddress)) {
            setAddress(newAddress);
        }
    }

    const updateLatLng = () => {
        setLatLng({ lat: map.getCenter().lat(), lng: map.getCenter().lng() });
    }

    const updateMapCenter = (latitude, longitude) => {
        console.log('updateMapCenter:', latitude, longitude)
        map.setCenter({ lat: parseFloat(latitude), lng: parseFloat(longitude) });
        map.setZoom(18);
        setMapCenter({ lat: parseFloat(latitude), lng: parseFloat(longitude) });
    };

    useEffect(() => {
        console.log('Fetching locations with status:', status, applicant, address);
        axios.get(`http://localhost:8000/api/locations?status=${status}&applicant=${applicant}&address=${address}&lat=${latLng.lat}&lng=${latLng.lng}`)
        .then(response => {
            setLocations(response.data);
        })
        .catch(error => {
            console.error('Error fetching locations:', error);
        });
    }, [status,applicant,address,latLng]);

    return (
        <LocationContext.Provider value={{
            map,
            mapCenter,
            locations,
            activeLocation,
            status,
            setMap,
            updateActiveLocation,
            updateMapCenter,
            updateStatus,
            updateAddress,
            updateApplicant,
            updateLatLng,
            }}>
          {children}
        </LocationContext.Provider>
    );
};

export { LocationContext, LocationProvider };


function safeString(str) {
    // Regular expression to match only alphabet characters or numbers
    const regex = /^[a-zA-Z0-9]+$/;
    return regex.test(str);
  }
  
// get 5 mile radius from center of map
function calculateBounds(centerLat, centerLng) {
    const bounds = {
        north: centerLat + (5 / 6371) * (180 / Math.PI),
        south: centerLat - (5 / 6371) * (180 / Math.PI),
        east: centerLng + (5 / 6371) * (180 / Math.PI) / Math.cos(centerLat * Math.PI/180),
        west: centerLng - (5 / 6371) * (180 / Math.PI) / Math.cos(centerLat * Math.PI/180)
    };
    return bounds;
}
  