import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Form from './Form';
import { LocationContext } from '../LocationProvider/LocationContext';

describe('Form Component', () => {
  test('updates context values on input change and select change', () => {
    const mockUpdateStatus = jest.fn();
    const mockUpdateApplicant = jest.fn();
    const mockUpdateAddress = jest.fn();

    const { getByLabelText, getByTestId } = render(
      <LocationContext.Provider
        value={{ updateStatus: mockUpdateStatus, updateApplicant: mockUpdateApplicant, updateAddress: mockUpdateAddress }}
      >
        <Form />
      </LocationContext.Provider>
    );

    const applicantInput = getByLabelText('Applicant:');
    fireEvent.change(applicantInput, { target: { value: 'Test Applicant' } });
    expect(mockUpdateApplicant).toHaveBeenCalledWith('Test Applicant');

    const addressInput = getByLabelText('Address:');
    fireEvent.change(addressInput, { target: { value: 'Test Address' } });
    expect(mockUpdateAddress).toHaveBeenCalledWith('Test Address');

    const statusSelect = getByTestId('status-select');
    fireEvent.change(statusSelect, { target: { value: 'DENIED' } });
    expect(mockUpdateStatus).toHaveBeenCalledWith('DENIED');
  });
});
