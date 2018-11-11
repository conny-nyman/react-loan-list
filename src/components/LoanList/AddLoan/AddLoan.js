import React, {Component} from 'react';
import MDFormInput from "../../UI/MDFormInput/MDFormInput";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
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

    onLenderChangedHandler = (option) => {
        let loan = {...this.state.loan};
        loan.lender = option.value;
        this.setState(updateObject(this.state, {loan: loan}));
    }

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
                            <DayPickerInput placeholder="Date" onDayChange={this.onDayChangedHandler}/>
                        </div>
                        <div className="col-md-3">
                            <MDFormInput type="number" id="amount" placeholder="Amount" changed={this.onInputChangedHandler}/>
                        </div>
                        <div className="col-md-3">
                            <Dropdown options={this.props.lenders} value={this.state.loan.lender} onChange={this.onLenderChangedHandler} placeholder="Lender" />
                        </div>
                    </div>
                    <button id="save-loan" type="submit" className="btn btn-primary btn-md">Save loan</button>
                </form>
            </div>
        );
    }
}

export default AddLoan;
