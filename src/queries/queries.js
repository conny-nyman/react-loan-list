import {gql} from 'apollo-boost';

const getLoansQuery = gql`
    {
        readLoans {
            ID
            Sum
            DateOfLoan
            Lender {
                ID
                FirstName
                Surname
            }
            Borrower {
                ID
                FirstName
                Surname
            }
        }
    }
`;
// "2018-10-24 01:03:00"
const createLoanMutation = gql`
    mutation($Sum: Float!, $DateOfLoan: String!, $LenderID: ID!) {
      createLoan(Input: {Sum: $Sum, DateOfLoan: $DateOfLoan, LenderID: $LenderID}) {
        ID
        Sum
        DateOfLoan
      }
    }
`;

const createTokenMutation = gql`
    mutation($Email: String!, $Password: String!) {
      createToken(Email: $Email, Password: $Password) {
        Token,
        ID,
        FirstName,
        Surname
      }
    }
`;

export {getLoansQuery, createLoanMutation, createTokenMutation}