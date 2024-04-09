import React, { useState, useContext } from 'react';
import { LocationContext } from '../LocationProvider/LocationContext.js';
import './Form.css';

function Form() {
    const options = ['APPROVED', 'ALL', 'DENIED', 'REQUESTED', 'SUSPEND', 'EXPIRED', 'ISSUED'];
    const [selectedOption, onSelect] = useState(options[0]);
    const { updateStatus, updateApplicant, updateAddress } = useContext(LocationContext);

    const [formData, setFormData] = useState({
        name: '',
        address: '',
        latitude: '',
        longitude: '',
    });

    const handleChangeApp = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        updateApplicant(e.target.value)
    };

    const handleChangeAdd = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        updateAddress(e.target.value)
    };

    const handleSelect = (value) => {
        onSelect(value);
        updateStatus(value);
    }

    return (
        <form className='Form'>
        <div>
            <label htmlFor="applicant">Applicant:</label>
            <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChangeApp}
            autoComplete="off"
            />
        </div>
        <div>
            <label htmlFor="address">Address:</label>
            <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChangeAdd}
            autoComplete="off"
            />
        </div>
        <div>
            <label htmlFor="status">Status:</label>
            <select value={selectedOption} onChange={(e) => handleSelect(e.target.value)}>
                {options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
        </form>
    );
}

export default Form;
