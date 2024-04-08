import React, { useContext } from 'react';
import { LocationContext } from '../../LocationProvider/LocationContext';
import './Location.css';

const Location = ({ element }) => {
    const {updateActiveLocation, updateMapCenter }  = useContext(LocationContext);

    const onClick = (location) => {
        updateActiveLocation(location.locationId);
        updateMapCenter(location.latitude, location.longitude);
    };

    return (
        <div className="location" onClick={() => onClick(element)}>
            <div className="data-item">
                <span className="label">Location ID:</span> {element.locationid}
            </div>
            <div className="data-item">
                <span className="label">Applicant:</span> {element.applicant}
            </div>
            <div className="data-item">
                <span className="label">Facility Type:</span> {element.facilitytype}
            </div>
            <div className="data-item">
                <span className="label">Permit:</span> {element.permit}
            </div>
            <div className="data-item">
                <span className="label">Status:</span> {element.status}
            </div>
            <div className="data-item">
                <span className="label">Approved:</span> {element.approved}
            </div>
            <div className="data-item">
                <span className="label">Prior Permit:</span> {element.priorpermit}
            </div>
            <div className="data-item">
                <span className="label">Location:</span> {element.address}
            </div>
            <div className="data-item">
                <span className="label">Food Items:</span> {element.fooditems}
            </div>
            <div className="data-item">
                <span className="label">Latitude:</span> {element.latitude}
            </div>
            <div className="data-item">
                <span className="label">Longitude:</span> {element.longitude}
            </div>
        </div>
    );
};

export default Location;