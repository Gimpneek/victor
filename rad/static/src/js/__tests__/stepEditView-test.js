/**
 * Created by colinwren on 23/04/2016.
 */
jest.unmock('../components/Feature/Scenario/Step/StepEditView');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import StepEditView from '../components/Feature/Scenario/Step/StepEditView';

describe('Step - Edit View', () => {
    const stepEditView = TestUtils.renderIntoDocument(<StepEditView name="Test Name"/>);
    const stepEditViewNode = ReactDOM.findDOMNode(stepEditView);
    
    it('Shows an edit box with the name', () => {
        const nameNode = stepEditViewNode.getElementsByTagName('input')[0];
        expect(nameNode.value).toBe('Test Name');
    });

    it('Shows a close button', () => {
        const buttonNode = stepEditViewNode.getElementsByClassName('is-danger')[0];
        expect(buttonNode.textContent).toBe('Close');
    });

});