import * as utilConstants from "./constants";
import ApolloClient from "apollo-boost";

const getAuthHeader = () => {
    const token = localStorage.getItem(utilConstants.MEMBER_TOKEN);
    if (token){
        return {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    }
    return {};
};

// apollo client setup
export const client = new ApolloClient({
    uri: utilConstants.GRAPHQL_ENDPOINT,
    request: async operation => {
        operation.setContext({
            ...getAuthHeader()
        });
    }
});

export default client;
