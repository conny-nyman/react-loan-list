import React, {Component} from 'react';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddLoan from "./AddLoan/AddLoan";
import LoanItem from "./LoanItem/LoanItem";
import {graphql, compose} from 'react-apollo';
import {getLoansQuery, createLoanMutation, getHouseMembersQuery} from '../../queries/queries';

class LoanList extends Component {
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
            const query = newProps.getHouseMembersQuery;
            if (!query.loading) {
                this.pushHouseMembersToLendersArray(query.readHouseMembers);
            }
        }
    }

    pushHouseMembersToLendersArray(members) {
        if (members) {
            const lenders = [];
            members.map((member) => {
                lenders.push({value: member.ID, label: `${member.FirstName} ${member.Surname}`})
            });
            this.setState({...this.state, lenders: lenders});
        }
    }

    addItem = (loan) => {
        this.props.createLoanMutation({
            variables: {
                Sum: parseFloat(loan[LoanList.AMOUNT]),
                DateOfLoan: loan[LoanList.DATE],
                LenderID: loan[LoanList.LENDER]
            }
        }).then(() => {
            toast.success('Loan added!');
        }).catch((err) => {
            toast.error(err.message);
        })
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
            if (query.error) {
                // query error
                toast.error(query.error.message);
            }
            else if (query.errors) {
                // validation error
                query.errors.map(error => toast.error(error.message));
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
