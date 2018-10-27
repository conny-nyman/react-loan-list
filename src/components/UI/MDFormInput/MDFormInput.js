import React from 'react';

const MDFormInput = ({required, type, id, value, placeholder, changed, disabled}) => {
    return (
        <div>
            <div className="md-form form-group">
                <input required={required} type={type} className="form-control" value={value} id={id} placeholder={placeholder} onChange={changed} disabled={disabled}/>
            </div>
        </div>
    );
};

export default MDFormInput;
