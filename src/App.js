import React, {Component} from 'react';
import './styles/css/App.css';

import Header from './components/Header/Header';

class App extends Component {
    render() {
        return (
            <div className="App container-fluid">
                <Header title="React Loan App" cssClasses="py-5 bg-light"/>
            </div>
        );
    }
}

export default App;
