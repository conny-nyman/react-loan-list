import React, {Component} from 'react';
import './styles/css/App.css';

import Header from './components/Header/Header';
import LoanList from './components/LoanList/LoanList';

class App extends Component {
    render() {
        return (
            <div className="App container-fluid">
                <Header title="React Loan App" cssClasses="py-5 bg-light"/>
                <LoanList/>
            </div>
        );
    }
}

export default App;
