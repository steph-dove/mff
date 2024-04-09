import React from 'react';
import { render, waitFor } from '@testing-library/react';
import axios from 'axios';
import { LocationContext, LocationProvider } from './LocationProvider';

jest.mock('axios');

describe('LocationProvider Component', () => {
  const MockChildComponent = () => <div>Mock Child Component</div>;

  test('renders children', () => {
    const { getByText } = render(
      <LocationProvider>
        <MockChildComponent />
      </LocationProvider>
    );

    expect(getByText('Mock Child Component')).toBeInTheDocument();
  });

  test('fetches locations with correct parameters and sets them in context', async () => {
    const mockLocations = [
      {
        id: 1,
        name: 'Location 1',
        latitude: 37.7749,
        longitude: -122.4194,
      },
      {
        id: 2,
        name: 'Location 2',
        latitude: 37.7750,
        longitude: -122.4195,
      },
    ];

    axios.get.mockResolvedValue({ data: mockLocations });

    const { getByText } = render(
      <LocationProvider>
        <LocationContext.Consumer>
          {(value) => (
            <>
              <div data-testid="location-count">{value.locations.length}</div>
              <button onClick={() => value.updateStatus('APPROVED')}>Update Status</button>
            </>
          )}
        </LocationContext.Consumer>
      </LocationProvider>
    );

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('http://localhost:8000/api/locations?status=approved&applicant=&address=&lat=37.773972&lng=-122.431297');
      expect(getByText('2')).toBeInTheDocument();
    });
  });

  test('updates status in context with valid status', async () => {
    const { getByText } = render(
      <LocationProvider>
        <LocationContext.Consumer>
          {(value) => (
            <button onClick={() => value.updateStatus('APPROVED')}>Update Status</button>
          )}
        </LocationContext.Consumer>
      </LocationProvider>
    );

    const updateStatusButton = getByText('Update Status');
    expect(updateStatusButton).toBeInTheDocument();

    updateStatusButton.click();

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('http://localhost:8000/api/locations?status=approved&applicant=&address=&lat=37.773972&lng=-122.431297');
    });
  });

  // Similarly, you can write tests for updateApplicant, updateAddress, updateLatLng, and updateMapCenter functions
});
