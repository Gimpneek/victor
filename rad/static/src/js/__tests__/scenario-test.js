jest.unmock('../components/Feature/Scenario');
jest.unmock('axios');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Scenario from '../components/Feature/Scenario';

const TEST_SCENARIO_NO_STEP = {
    name: "Addition",
    keyword: "Scenario",
    tags: [],
    steps: []
};
const PASSED_STEP = {
    result: {
        status: 'passed'
    }
};
const FAILED_STEP = {
    result: {
        status: 'failed'
    }
};

const INCOMPLETE_STEP = {
    result: {}
}

const TEST_SCENARIO_PASSED = {
    name: "Addition",
    keyword: "Scenario",
    tags: [],
    steps: [PASSED_STEP, PASSED_STEP]
};

const TEST_SCENARIO_MIXED = {
    name: "Addition",
    keyword: "Scenario",
    tags: [],
    steps: [PASSED_STEP, FAILED_STEP]
};

const TEST_SCENARIO_FAILED = {
    name: "Addition",
    keyword: "Scenario",
    tags: [],
    steps: [FAILED_STEP, FAILED_STEP]
};

const TEST_SCENARIO_INCOMPLETE = {
    name: "Addtion",
    keyword: "Scenario",
    tags: [],
    steps: [INCOMPLETE_STEP]
}

describe('Scenario', () => {
    const scenarioNoStep = TestUtils.renderIntoDocument(<Scenario scenario={TEST_SCENARIO_NO_STEP}/>);
    const scenarioPassed = TestUtils.renderIntoDocument(<Scenario scenario={TEST_SCENARIO_PASSED}/>);
    const scenarioMixed = TestUtils.renderIntoDocument(<Scenario scenario={TEST_SCENARIO_MIXED}/>);
    const scenarioFailed = TestUtils.renderIntoDocument(<Scenario scenario={TEST_SCENARIO_FAILED}/>);
    const scenarioIncomplete = TestUtils.renderIntoDocument(<Scenario scenario={TEST_SCENARIO_INCOMPLETE}/>);
    const scenarioNoStepNode = ReactDOM.findDOMNode(scenarioNoStep);
    const scenarioPassedNode = ReactDOM.findDOMNode(scenarioPassed);
    const scenarioMixedNode = ReactDOM.findDOMNode(scenarioMixed);
    const scenarioFailedNode = ReactDOM.findDOMNode(scenarioFailed);
    const scenarioIncompleteNode = ReactDOM.findDOMNode(scenarioIncomplete);

    it('Shows the scenario name from the Scenario object', () => {
        const nameNode = scenarioNoStepNode.getElementsByTagName('h3')[0];
        expect(nameNode.textContent).toBe('Scenario: Addition Run');
    });
    
    it('Changes the background colour of depending on status - no steps', () => {
       expect(scenarioNoStepNode.getAttribute('class')).toBe('box failed');
    });

    it('Changes the background colour of depending on status - all passed', () => {
       expect(scenarioPassedNode.getAttribute('class')).toBe('box passed');
    });

    it('Changes the background colour of depending on status - mixed', () => {
       expect(scenarioMixedNode.getAttribute('class')).toBe('box failed');
    });
    
    it('Changes the background colour of depending on status - failed', () => {
       expect(scenarioFailedNode.getAttribute('class')).toBe('box failed');
    });

    it('Changes to the background colour of box depending on status - incomplete', () => {
       expect(scenarioIncompleteNode.getAttribute('class')).toBe('box failed');
    });
});