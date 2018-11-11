// import React from 'react';
//
// import App from './App';
// import Header from './components/Header/Header'
//
// import {shallow} from 'enzyme';
//
// describe('<App />', () => {
//     let wrapper;
//
//     beforeEach(() => {
//         wrapper = shallow(<App/>);
//     });
//
//     it('should contain only one Header component', () => {
//         expect(wrapper).toContainExactlyOneMatchingElement('Header');
//     })
// });


// Link with examples: https://blog.logrocket.com/end-to-end-testing-react-apps-with-puppeteer-and-jest-ce2f414b4fd7

const puppeteer = require('puppeteer');

const login = async (page) => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('.Login');
    await page.click('input[id=email]');
    await page.type("input[id=email]", '(username)');
    await page.click("input[id=password]");
    await page.type("input[id=password]", '(password)');
    await page.click("button[type=submit]");
};

const addLoan = async (page) => {
    await page.waitForSelector('.AddLoan');
    await page.click('.Dropdown-root');
    await page.waitFor(500);
    await page.click('.Dropdown-option', '(DropDown option visible value)');

    await page.click("input[id=amount]");
    await page.type("input[id=amount]", '123');

    await page.click(".DayPickerInput input");
    await page.type(".DayPickerInput input", '2018-11-10');
    await page.waitFor(500);

    // Needs to be clicked twice for some reason..
    await page.click("button[type=submit]");
    await page.click("button[type=submit]");
};

const expectLoanItemsToExist = async (page) => {
    const loanItems = await page.evaluate(() => {
        let data = [];
        let elements = document.getElementsByClassName('LoanItem');
        for (let element of elements) {
            data.push(element.textContent);
        }
        return data;
    });

    await page.waitFor(1000);
    expect(loanItems.length).toBeGreaterThan(0);
};

describe('Loan form', () => {
    test('can login & create a new Loan', async () => {
        let browser = await puppeteer.launch({
            headless: false,
            devTools: true,
            slowMo: 25
        });
        let page = await browser.newPage();

        page.emulate({
            viewport: {
                width: 500,
                height: 2400
            },
            userAgent: ''
        });

        await login(page);
        await page.waitFor(1000);

        await addLoan(page);
        await page.waitFor(3000);

        await expectLoanItemsToExist(page);
        await page.waitFor(500);

        browser.close();
    }, 16000);
});