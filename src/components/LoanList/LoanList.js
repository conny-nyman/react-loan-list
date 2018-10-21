import React, {Component} from 'react';
import {updateObject} from "../../utils/utility";
import AddLoan from "./AddLoan/AddLoan";

class LoanList extends Component {
    static HOLDER = 'holder';
    static DESCRIPTION = 'description';
    static AMOUNT = 'amount';
    static OWNER = 'owner';

    state = {
        formData: {},
        items: []
    };

    onInputChangedHandler = (e) => {
        let formData = {...this.state.formData};
        formData[e.target.id] = e.target.value;

        this.setState(updateObject(
            this.state,
            {
                formData: formData
            }
        ));
    };

    onDeleteItemHandler = (id) => {
        this.setState({
            ...this.state,
            items: this.state.items.filter(item => item.id !== id)
        })
    };

    addItem = (e) => {
        const updatedState = updateObject(
            this.state,
            {
                items: this.state.items.concat(this.getLoanItem(this.state))
            }
        );

        this.setState(updatedState);
        e.preventDefault();
    };

    getLoanItem = (state = this.state) => {
        const formData = {};

        for (let inputKey in this.state.formData) {
            formData[inputKey] = this.state.formData[inputKey];
        }

        formData.id = this.getRandomId();

        return formData;
    };

    getRandomId = () => {
        const rndNum = Math.floor(Math.random() * 101);
        return `${rndNum}-${new Date()}`;
    };

    render() {
        let items = <h4 className="bg-light p-3 mt-3">The loan list is empty!</h4>;

        if (this.state.items.length > 0) {
            items = this.state.items.map((item, index) =>
                <div key={index} className="col-sm-12 col-md-6 col-lg-4 p-0 mt-3" onClick={() => this.onDeleteItemHandler(item.id)}>
                    <div>
                        <div className="bg-light p-3 m-1 cursor-pointer hover-red">
                            <h4><strong>Holder:</strong> {item[LoanList.HOLDER]}</h4>
                            <h4><strong>Description:</strong> {item[LoanList.DESCRIPTION]}</h4>
                            <h4><strong>Amount:</strong> {item[LoanList.AMOUNT]}</h4>
                            <h4><strong>Owner:</strong> {item[LoanList.OWNER]}</h4>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="LoanList container row py-3 mx-auto">
                <div className="col-12 text-center">
                    <AddLoan
                        onSubmit={this.addItem}
                        holderId={LoanList.HOLDER}
                        descriptionId={LoanList.DESCRIPTION}
                        amountId={LoanList.AMOUNT}
                        ownerId={LoanList.OWNER}
                        changed={(event) => this.onInputChangedHandler(event)}
                    />
                </div>
                {items}
            </div>
        );
    }
}

export default LoanList;
