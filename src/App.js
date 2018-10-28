import React, {Component} from 'react';
import client from './utils/graphqlUtils';
import {ApolloProvider} from 'react-apollo';
import Header from './components/Header/Header';
import LoanList from './components/LoanList/LoanList';
import Login from './components/Login/Login';
import './styles/css/App.css';
import {getCurrentUser, isUserAuthenticated} from "./utils/permissionUtils";
import {ToastContainer, Flip} from "react-toastify";

class App extends Component {

    state = {
        isAuthenticated: isUserAuthenticated(),
        user: getCurrentUser()
    };

    onLoginHandler = (isLoggedIn) => {
        this.setState({
            ...this.state,
            isAuthenticated: isLoggedIn
        });
    };

    render() {
        return (
            <ApolloProvider client={client}>
                <div className="App container-fluid">
                    <Header title="React Loan App" cssClasses="py-5 bg-light"/>
                    {this.state.isAuthenticated ? <LoanList/> : <Login onLogin={(user) => this.onLoginHandler(user)}/>}
                </div>
                <ToastContainer transition={Flip} autoClose={3000}/>
            </ApolloProvider>
        );
    }
}

export default App;
