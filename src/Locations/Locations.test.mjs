import React from 'react';
import { render } from '@testing-library/react';
import Locations from './Locations';

describe('Locations Component', () => {
    it('renders a list of locations correctly', () => {
        // Mock location data
        const locations = [
            { locationid: 1, name: 'Location 1', address: 'Address 1' },
            { locationid: 2, name: 'Location 2', address: 'Address 2' },
            // Add more mock data as needed
        ];

        // Render the Locations component with mocked context value
        const { getAllByRole } = render(
            <LocationContext.Provider value={{ locations }}>
                <Locations />
            </LocationContext.Provider>
        );

        // Get all rendered Location components
        const locationElements = getAllByRole('listitem');

        // Assert that the correct number of locations are rendered
        expect(locationElements.length).toBe(locations.length);

        // Assert that each location is rendered with the correct data
        locationElements.forEach((element, index) => {
            expect(element).toHaveTextContent(locations[index].name);
            expect(element).toHaveTextContent(locations[index].address);
            // Add more assertions for other properties as needed
        });
    });
});
