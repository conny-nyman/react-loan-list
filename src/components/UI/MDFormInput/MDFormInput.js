import React from 'react';

const MDFormInput = ({required, type, id, placeholder, changed}) => {
    return (
        <div>
            <div className="md-form form-group">
                <input required={required} type={type} className="form-control" id={id} placeholder={placeholder} onChange={changed}/>
            </div>
        </div>
    );
};

export default MDFormInput;
