import React, {Component} from 'react';
import MDFormInput from "../../UI/MDFormInput/MDFormInput";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import {updateObject} from "../../../utils/utility";
import {getCurrentUser} from "../../../utils/permissionUtils";

class AddLoan extends Component {

    state = {
        loan: {
            date: '',
            amount: '',
            lender: ''
        },
        user: getCurrentUser()
    };

    onInputChangedHandler = (e) => {
        let loan = {...this.state.loan};
        loan[e.target.id] = e.target.value;
        this.setState(updateObject(this.state, {loan: loan}));
    };

    onDayChangedHandler = (day) => {
        let loan = {...this.state.loan};
        loan.date = day;
        this.setState(updateObject(this.state, {loan: loan}))
    };

    onSubmitHandler = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state.loan);
    };

    render() {
        return (
            <div className="AddLoan">
                <form onSubmit={this.onSubmitHandler}>
                    <div className="form-row d-flex align-items-center justify-content-center">
                        <div className="col-md-3">
                            <MDFormInput type="text" id="borrower" value={`${this.state.user.firstName} ${this.state.user.surname}`} disabled={true}/>
                        </div>
                        <div className="col-md-3">
                            <DayPickerInput placeholder="date" onDayChange={this.onDayChangedHandler}/>
                        </div>
                        <div className="col-md-3">
                            <MDFormInput type="text" id={this.props.amountId} placeholder={this.props.amountId} changed={this.onInputChangedHandler}/>
                            {this.state.loan.amount}
                        </div>
                        <div className="col-md-3">
                            <MDFormInput required={true} type="text" id={this.props.ownerId} placeholder={this.props.ownerId} changed={this.onInputChangedHandler}/>
                            {this.state.loan.lender}
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary btn-md">Add</button>
                </form>
            </div>
        );
    }
}

export default AddLoan;
