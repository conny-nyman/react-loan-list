import React from 'react';

import App from './App';
import Header from './components/Header/Header'

import {shallow} from 'enzyme';

describe('<App />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<App/>);
    });

    it('should contain only one Header component', () => {
        expect(wrapper).toContainExactlyOneMatchingElement('Header');
    })
});