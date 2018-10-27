// TODO: Make a request to the validation endpoint to verify the token.
import * as utilConstants from "./constants";

export const isUserAuthenticated = () => {
    // returns true if token is set.
    return !!localStorage.getItem(utilConstants.MEMBER_TOKEN);
};

export const getCurrentUser = () => {
    if (isUserAuthenticated()) {
        return {
            id: localStorage.getItem(utilConstants.MEMBER_ID),
            firstName: localStorage.getItem(utilConstants.MEMBER_FIRST_NAME),
            surname: localStorage.getItem(utilConstants.MEMBER_SURNAME)
        }
    }
    return null;
};