import React from 'react';

import LoanList from './LoanList';
import AddLoan from './AddLoan/AddLoan';
import LoanItem from './LoanItem/LoanItem';

import {shallow} from 'enzyme';

describe('<LoanList />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<LoanList/>);
    });

    it('should contain only one AddLoan component.', () => {
        expect(wrapper).toContainExactlyOneMatchingElement('AddLoan');
    });

    it('should render "The loan list is empty!" when the items array is empty.', () => {
       expect(wrapper.find('.LoanList')).toIncludeText('The loan list is empty!')
    });

    it('should render three LoanItem components with three objects in the items array.', () => {
        wrapper.setState({
            items: [
                {
                    holder: 'holder-1',
                    amount: '1',
                    description: 'First test item',
                    owner: 'owner-1'
                },
                {
                    holder: 'holder-2',
                    amount: '2',
                    description: 'Second test item',
                    owner: 'owner-2'
                },
                {
                    holder: 'holder-3',
                    amount: '3',
                    description: 'Third test item',
                    owner: 'owner-3'
                }
            ]
        });
        expect(wrapper).toContainMatchingElements(3, 'LoanItem');
    });
});