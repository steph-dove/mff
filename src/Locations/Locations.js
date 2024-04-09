import React, { useContext } from 'react';
import Location from './Location/Location.js';
import { LocationContext } from '../LocationProvider/LocationContext.js';
import './Locations.css';

const Locations = () => {

    const { locations }  = useContext(LocationContext);

    return (
        <div className="scrollable-container">
            <ul>
                {locations.map(location => (
                    < Location
                    key={location.locationid}
                    element={location}
                    />
                ))}
            </ul>
        </div>
    );
};

export default Locations;
