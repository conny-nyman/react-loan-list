import React from 'react';

const LoanItem = ({clicked, holder, description, amount, owner}) => {
    return (
        <div className="LoanItem col-sm-12 col-md-6 col-lg-4 p-0 mt-3" onClick={clicked}>
            <div>
                <div className="bg-light p-3 m-1 cursor-pointer hover-red">
                    <h4><strong>Holder:</strong> {holder}</h4>
                    <h4><strong>Description:</strong> {description}</h4>
                    <h4><strong>Amount:</strong> {amount}</h4>
                    <h4><strong>Owner:</strong> {owner}</h4>
                </div>
            </div>
        </div>
    );
};

export default LoanItem;
