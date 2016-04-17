jest.unmock('../components/Feature/Scenario/Step');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Step from '../components/Feature/Scenario/Step';

const TEST_STEP = {
    name: "I have \"2\" apples",
    keyword: "Given",
    step_type: "given",
    result: {
        status: "passed",
        duration: 0.0001289844512939453
    },
    match: {
        location: "example.py:4",
        arguments: [{
            name: "starting_apples",
            value: "\"2\""
        }]
    },
    location: "example.feature:8"
}

describe('Step', () => {
    const step = TestUtils.renderIntoDocument(<Step step={TEST_STEP}/>);
    const stepNode = ReactDOM.findDOMNode(step);

    it('Shows the keyword from the Step object', () => {
        const keywordNode = stepNode.getElementsByTagName('strong')[0];
        expect(keywordNode.textContent).toBe('Given');
    });

    it('Shows the step keyword and step name', () => {
        expect(stepNode.textContent).toBe('Given I have "2" apples');
    });

    it('Shows the icon for the step', () => {
        const iconNode = stepNode.getElementsByTagName('i')[0];
        expect(iconNode.getAttribute('class')).toBe('fa fa-check');
    });
});