import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import axios from "axios";
import {updateCountry} from "../store/slices/TripSlice";
import {useDispatch} from "react-redux";

const CountryDropdown = () => {
    const [countryOptions, setCountryOptions] = useState([]);
    const dispatch = useDispatch()

    const handleCountryChange = (selectedOption) => {
        dispatch(updateCountry(selectedOption.label));
    }

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get('https://restcountries.com/v3.1/all');
                const data = await response.data;
                const options = data.map(country => ({
                    value: country.cca2.toLowerCase(),
                    label: country.name.common
                })).sort((a, b) => a.label.localeCompare(b.label));
                setCountryOptions(options);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };
        fetchCountries();
    }, []);

    return (
        <div>
            <Select options={countryOptions} onChange={handleCountryChange}/>
        </div>
    );
}

export default CountryDropdown;