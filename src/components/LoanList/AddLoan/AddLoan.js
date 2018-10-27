import React from 'react';
import MDFormInput from "../../UI/MDFormInput/MDFormInput";

const AddLoan = (props) => {
    // TODO : Add local state here with form data then onSubmit send it to parent!
    return (
        <div className="AddLoan">
            <form onSubmit={props.onSubmit}>
                <div className="form-row">
                    <div className="col-md-3">
                        <MDFormInput required={true} type="text" id={props.holderId} placeholder={props.holderId} changed={props.changed}/>
                    </div>
                    <div className="col-md-3">
                        <MDFormInput required={true} type="text" id={props.descriptionId} placeholder={props.descriptionId} changed={props.changed}/>
                    </div>
                    <div className="col-md-3">
                        <MDFormInput type="text" id={props.amountId} placeholder={props.amountId} changed={props.changed}/>
                    </div>
                    <div className="col-md-3">
                        <MDFormInput required={true} type="text" id={props.ownerId} placeholder={props.ownerId} changed={props.changed}/>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary btn-md">Add</button>
            </form>
        </div>
    );
};

export default AddLoan;
