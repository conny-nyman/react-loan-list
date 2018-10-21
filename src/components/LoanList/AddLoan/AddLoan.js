import React from 'react';
import MDFormInput from "../../UI/MDFormInput/MDFormInput";

const AddLoan = (props) => {
    return (
        <div className="AddLoan">
            <form onSubmit={props.onSubmit}>
                <div className="form-row">
                    <div className="col-md-3">
                        <MDFormInput required={true} type="text" id={props.holderId} placeholder="Holder" changed={props.changed}/>
                    </div>
                    <div className="col-md-3">
                        <MDFormInput required={true} type="text" id={props.descriptionId} placeholder="Item description" changed={props.changed}/>
                    </div>
                    <div className="col-md-3">
                        <MDFormInput type="text" id={props.amountId} placeholder="Amount" changed={props.changed}/>
                    </div>
                    <div className="col-md-3">
                        <MDFormInput required={true} type="text" id={props.ownerId} placeholder="Owner" changed={props.changed}/>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary btn-md">Add</button>
            </form>
        </div>
    );
};

export default AddLoan;
