import React, {Component} from 'react';
import {updateObject} from "../../utils/utility";
import AddLoan from "./AddLoan/AddLoan";
import LoanItem from "./LoanItem/LoanItem";
import {graphql, compose} from 'react-apollo';
import {getLoansQuery, createLoanMutation} from '../../queries/queries';

class LoanList extends Component {
    static BORROWER = 'borrower';
    static DATE = 'date';
    static AMOUNT = 'amount';
    static LENDER = 'lender';

    state = {
        formData: {},
        items: []
    };

    onInputChangedHandler = (e) => {
        let formData = {...this.state.formData};
        formData[e.target.id] = e.target.value;

        this.setState(updateObject(
            this.state,
            {
                formData: formData
            }
        ));
    };

    addItem = (e) => {
        e.preventDefault();
        this.props.createLoanMutation({
            variables: {
                Sum: parseFloat(this.state.formData[LoanList.AMOUNT]),
                DateOfLoan: this.state.formData[LoanList.DATE],
                LenderID: this.state.formData[LoanList.LENDER]
            }
        });
    };

    displayLoans() {
        const query = this.props.getLoansQuery;

        if (query.loading) {
            return (<div className="col-12 text-center">Loading loans...</div>);
        } else {
            if (query.readLoans) {
                return query.readLoans.map((item, index) =>
                    <LoanItem
                        key={index}
                        holder={`${item.Borrower.FirstName} ${item.Borrower.Surname}`}
                        date={item.DateOfLoan}
                        amount={item.Sum}
                        owner={`${item.Lender.FirstName} ${item.Lender.Surname}`}
                    />
                )
            }
            return <div className="col-12 text-center">Could not fetch loans, are you authenticated?</div>;
        }
    }

    render() {
        return (
            <div>
                <div className="LoanList container row py-3 mx-auto">
                    <div className="col-12 text-center">
                        <AddLoan
                            onSubmit={this.addItem}
                            holderId={LoanList.BORROWER}
                            descriptionId={LoanList.DATE}
                            amountId={LoanList.AMOUNT}
                            ownerId={LoanList.LENDER}
                            changed={(event) => this.onInputChangedHandler(event)}
                        />
                    </div>
                </div>
                <hr/>
                <h3 className="text-center">Existing</h3>
                <hr/>
                <div className="container row mx-auto">
                    {this.displayLoans()}
                </div>
            </div>
        );
    }
}

export default compose(
    graphql(getLoansQuery, {name: 'getLoansQuery'}),
    graphql(createLoanMutation, {name: 'createLoanMutation'})
)(LoanList);
