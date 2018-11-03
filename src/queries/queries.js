import {gql} from 'apollo-boost';

export const getLoansQuery = gql`
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

export const getHouseMembersQuery = gql`
    {
        readHouseMembers {
            ID
            FirstName
            Surname
        }
    }
`;

// "2018-10-24 01:03:00"
export const createLoanMutation = gql`
    mutation($Sum: Float!, $DateOfLoan: String!, $LenderID: ID!) {
      createLoan(Input: {Sum: $Sum, DateOfLoan: $DateOfLoan, LenderID: $LenderID}) {
        ID
        Sum
        DateOfLoan
      }
    }
`;

export const createTokenMutation = gql`
    mutation($Email: String!, $Password: String!) {
      createToken(Email: $Email, Password: $Password) {
        Token,
        ID,
        FirstName,
        Surname
      }
    }
`;

export const deleteLoanMutation = gql`
    mutation($IDs: ID!) {
        deleteLoan(IDs: [$IDs]) {
            ID
        }
    }
`;
