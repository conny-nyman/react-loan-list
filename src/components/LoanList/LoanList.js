import React, {Component} from 'react';
import {updateObject} from "../../utils/utility";
import AddLoan from "./AddLoan/AddLoan";
import LoanItem from "./LoanItem/LoanItem";
import {graphql, compose} from 'react-apollo';
import {getLoansQuery, createLoanMutation, getHouseMembersQuery} from '../../queries/queries';

class LoanList extends Component {
    static BORROWER = 'borrower';
    static DATE = 'date';
    static AMOUNT = 'amount';
    static LENDER = 'lender';

    state = {
        items: [],
        lenders: []
    };

    componentWillReceiveProps(newProps) {
        this.addHouseMembersFromQueryResult(newProps);
    }

    addHouseMembersFromQueryResult(newProps) {
        if (this.state.lenders && this.state.lenders.length === 0) {
            if (!newProps.getHouseMembersQuery.loading) {
                this.addHouseMembersToLendersArray(newProps.getHouseMembersQuery.readHouseMembers);
            }
        }
    }

    addHouseMembersToLendersArray(members) {
        const lenders = [];
        members.map((member) => {
            lenders.push({value: member.ID, label: `${member.FirstName} ${member.Surname}`})
        });
        this.setState({...this.state, lenders: lenders});
    }

    addItem = (loan) => {
        this.props.createLoanMutation({
            variables: {
                Sum: parseFloat(loan[LoanList.AMOUNT]),
                DateOfLoan: loan[LoanList.DATE],
                LenderID: loan[LoanList.LENDER]
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
                            lenders={this.state.lenders}
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
    graphql(getHouseMembersQuery, {name: 'getHouseMembersQuery'}),
    graphql(createLoanMutation, {name: 'createLoanMutation'})
)(LoanList);
