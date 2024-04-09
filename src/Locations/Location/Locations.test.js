import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Location from './Location';
import { LocationContext } from '../../LocationProvider/LocationContext';

describe('Location Component', () => {
  const location = {
    locationId: 1,
    latitude: 37.7749,
    longitude: -122.4194,
    objectid: 123,
    applicant: 'Test Applicant',
    facilitytype: 'Test Facility',
    permit: 'Test Permit',
    status: 'Test Status',
    approved: 'Test Approved',
    priorpermit: 'Test Prior Permit',
    address: 'Test Address',
    fooditems: 'Test Food Items',
  };

  test('renders location details correctly', () => {
    const { getByText } = render(
      <Location element={location} />
    );

    expect(getByText(`Location ID: ${location.objectid}`)).toBeInTheDocument();
    expect(getByText(`Applicant: ${location.applicant}`)).toBeInTheDocument();
    expect(getByText(`Facility Type: ${location.facilitytype}`)).toBeInTheDocument();
    expect(getByText(`Permit: ${location.permit}`)).toBeInTheDocument();
    expect(getByText(`Status: ${location.status}`)).toBeInTheDocument();
    expect(getByText(`Approved: ${location.approved}`)).toBeInTheDocument();
    expect(getByText(`Prior Permit: ${location.priorpermit}`)).toBeInTheDocument();
    expect(getByText(`Location: ${location.address}`)).toBeInTheDocument();
    expect(getByText(`Food Items: ${location.fooditems}`)).toBeInTheDocument();
    expect(getByText(`Latitude: ${location.latitude}`)).toBeInTheDocument();
    expect(getByText(`Longitude: ${location.longitude}`)).toBeInTheDocument();
  });

  test('clicking on location triggers context functions', () => {
    const mockUpdateActiveLocation = jest.fn();
    const mockUpdateMapCenter = jest.fn();

    const { getByText } = render(
      <LocationContext.Provider value={{ updateActiveLocation: mockUpdateActiveLocation, updateMapCenter: mockUpdateMapCenter }}>
        <Location element={location} />
      </LocationContext.Provider>
    );

    fireEvent.click(getByText(`Location ID: ${location.objectid}`));

    expect(mockUpdateActiveLocation).toHaveBeenCalledWith(location.locationId);
    expect(mockUpdateMapCenter).toHaveBeenCalledWith(location.latitude, location.longitude);
  });
});
