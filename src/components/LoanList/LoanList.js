import React, {Component} from 'react';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddLoan from "./AddLoan/AddLoan";
import LoanItem from "./LoanItem/LoanItem";
import {graphql, compose} from 'react-apollo';
import * as queries from '../../queries/queries';
import {deleteTokenFromLocalStorage} from "../../utils/permissionUtils";

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
            },
            refetchQueries: [{
                query: queries.getLoansQuery
            }]
        }).then(() => {
            toast.success('Loan added!');
        }).catch((err) => {
            toast.error(err.message);
        })
    };

    deleteLoan = (id) => {
        this.props.deleteLoanMutation({
            variables: {
                IDs: id
            },
            refetchQueries: [{
                query: queries.getLoansQuery
            }]
        }).then((res) => {
            console.log('res', res);
            toast.success('Loan deleted!');
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
                        key={item.ID}
                        holder={`${item.Borrower.FirstName} ${item.Borrower.Surname}`}
                        date={item.DateOfLoan}
                        amount={item.Sum}
                        owner={`${item.Lender.FirstName} ${item.Lender.Surname}`}
                        clicked={(id) => {
                            if (window.confirm(`Are you sure you want to delete this item?\n
                            ID: ${item.ID}\n
                            Date: ${item.DateOfLoan}\n
                            Amount: ${item.Sum}\n
                            Borrower: ${item.Borrower.FirstName} ${item.Borrower.Surname}\n
                            Lender: ${item.Lender.FirstName} ${item.Lender.Surname}\n`
                            )) {
                                return this.deleteLoan(item.ID)
                            }
                        }}
                    />
                )
            }
            if (query.error) {
                // query error
                toast.error(query.error.message);
                deleteTokenFromLocalStorage();
            }
            else if (query.errors) {
                // validation error
                query.errors.map(error => toast.error(error.message));
                deleteTokenFromLocalStorage();
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
    graphql(queries.getLoansQuery, {name: 'getLoansQuery'}),
    graphql(queries.getHouseMembersQuery, {name: 'getHouseMembersQuery'}),
    graphql(queries.createLoanMutation, {name: 'createLoanMutation'}),
    graphql(queries.deleteLoanMutation, {name: 'deleteLoanMutation'})
)(LoanList);
