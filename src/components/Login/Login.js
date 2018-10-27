import React, {Component} from 'react';
import MDFormInput from "../UI/MDFormInput/MDFormInput";
import {graphql, compose} from 'react-apollo';
import {createTokenMutation} from '../../queries/queries';
import {updateObject} from "../../utils/utility";
import * as utilConstants from "../../utils/constants";

class Login extends Component {
    static EMAIL = 'email';
    static PASSWORD = 'password';

    state = {
        user: {
            email: '',
            password: ''
        }
    };

    onInputChanged = (e) => {
        const user = {...this.state.user};
        user[e.target.id] = e.target.value;

        this.setState(updateObject(
            this.state,
            {user: user}
        ));
    };

    onLoginHandler = async (e) => {
        e.preventDefault();

        const queryResult = await this.getAccessTokenQuery();
        const tokenQueryResult = queryResult.data.createToken;

        let isLoggedIn = false;
        const {Token, ID, FirstName, Surname} = tokenQueryResult;
        if (Token && ID && FirstName && Surname) {
            this.saveMemberDataToLocalStorage(Token, ID, FirstName, Surname);
            isLoggedIn = true;
        }

        this.props.onLogin(isLoggedIn);
    };

    getAccessTokenQuery = () => {
        return this.props.createTokenMutation({
            variables: {
                Email: this.state.user[Login.EMAIL],
                Password: this.state.user[Login.PASSWORD]
            }
        });
    };

    saveMemberDataToLocalStorage = (Token, ID, FirstName, Surname) => {
        localStorage.setItem(utilConstants.MEMBER_TOKEN, Token);
        localStorage.setItem(utilConstants.MEMBER_ID, ID);
        localStorage.setItem(utilConstants.MEMBER_FIRST_NAME, FirstName);
        localStorage.setItem(utilConstants.MEMBER_SURNAME, Surname);
    };

    render() {
        return (
            <div className="Login container">
                <form onSubmit={(e) => this.onLoginHandler(e)}>
                    <div className="form-row d-flex align-items-center justify-content-center">
                        <div className="col-md-4">
                            <MDFormInput required={true} type="text" id={Login.EMAIL} placeholder="Email" changed={(e) => this.onInputChanged(e)}/>
                        </div>
                        <div className="col-md-4">
                            <MDFormInput required={true} type="password" id={Login.PASSWORD} placeholder="Password" changed={(e) => this.onInputChanged(e)}/>
                        </div>
                        <div className="col-md-4">
                            <button type="submit" className="btn btn-primary btn-md">Login</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default compose(
    graphql(createTokenMutation, {name: 'createTokenMutation'})
)(Login);
