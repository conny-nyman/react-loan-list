import React from 'react';
import App from './App';

import {shallow} from 'enzyme';

describe('<App />', () => {
    it('should render without crashing', () => {
        const wrapper = shallow(<App/>);
        const projectTitle = <h1>React Loan App</h1>;
        expect(wrapper).toContainReact(projectTitle);
    });
});