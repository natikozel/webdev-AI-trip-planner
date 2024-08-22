import Select from "react-select";
import React from "react";
import {useDispatch} from "react-redux";
import {updateCountry, updateTripType} from "../store/slices/TripSlice";

const TripTypeDropdown = () => {
    const dispatch = useDispatch()

    const tripTypes = [
        {value: "Bicycle", label: "Bicycle"},
        {value: "Car", label: "Car"},
    ];


    const handleTripTypeChange = (selectedOption) => {
        dispatch(updateTripType(selectedOption.label));
    }

    return (
        <div>
            <Select options={tripTypes} onChange={handleTripTypeChange}/>
        </div>
    );
};

export default TripTypeDropdown