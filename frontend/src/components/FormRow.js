import React from 'react';

const FormRow = ({ label, children }) => {
    return (
        <div className="form__row">
            <label className="form__label">{label}</label>
            {children}
        </div>
    );
}

export default FormRow;