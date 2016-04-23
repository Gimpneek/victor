jest.unmock('../components/Feature/Scenario/Step');
jest.unmock('../components/Feature/Scenario/Step/StepReadView');
jest.unmock('../components/Feature/Scenario/Step/StepEditView');

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
};

const TEST_FAILED_STEP = {
    name: "I have \"2\" apples",
    keyword: "Given",
    step_type: "given",
    result: {
        status: "failed",
        duration: 0.0001289844512939453
    }
};

const TEST_NO_RESULT = {
    name: "I have \"2\" apples",
    keyword: "Given",
    step_type: "given",
};

describe('Step', () => {
    const step = TestUtils.renderIntoDocument(<Step step={TEST_STEP}/>);
    const failedStep = TestUtils.renderIntoDocument(<Step step={TEST_FAILED_STEP}/>);
    const noResultStep = TestUtils.renderIntoDocument(<Step step={TEST_NO_RESULT}/>);
    const stepNode = ReactDOM.findDOMNode(step);
    const failedStepNode = ReactDOM.findDOMNode(failedStep);
    const noResultStepNode = ReactDOM.findDOMNode(noResultStep);

    it('Shows the keyword from the Step object', () => {
        const keywordNode = stepNode.getElementsByTagName('strong')[0];
        expect(keywordNode.textContent).toBe('Given');
    });

    it('Shows the step keyword and step name', () => {
        expect(stepNode.textContent).toBe('Given I have "2" applesEdit');
    });

    it('Shows the icon for the step - passed', () => {
        const iconNode = stepNode.getElementsByTagName('i')[0];
        expect(iconNode.getAttribute('class')).toBe('fa fa-check');
    });

    it('Shows the icon for the step - failed', () => {
        const iconNode = failedStepNode.getElementsByTagName('i')[0];
        expect(iconNode.getAttribute('class')).toBe('fa fa-exclamation');
    });

    it('Shows the icon for the step - no result', () => {
        const iconNode = noResultStepNode.getElementsByTagName('i')[0];
        expect(iconNode.getAttribute('class')).toBe('fa fa-exclamation');
    });
});