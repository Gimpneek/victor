/**
 * Created by colinwren on 23/04/2016.
 */
jest.unmock('../components/Feature/Scenario/Step/StepReadView');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import StepReadView from '../components/Feature/Scenario/Step/StepReadView';

describe('Step - Read View', () => {
    const stepReadView = TestUtils.renderIntoDocument(<StepReadView name="Test Name"/>);
    const stepReadViewNode = ReactDOM.findDOMNode(stepReadView);
    
    it('Show the name passed to it', () => {
        const nameNode = stepReadViewNode.getElementsByClassName('step-name')[0];
        expect(nameNode.textContent).toBe('Test Name');
    });
    
    it('Shows an edit button', () => {
        const buttonNode = stepReadViewNode.getElementsByTagName('button')[0];
        expect(buttonNode.textContent).toBe('Edit');
    });
});