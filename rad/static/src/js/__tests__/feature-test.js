jest.unmock('../components/Feature');
jest.unmock('axios');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Feature from '../components/Feature';

const TEST_FEATURE = {
    elements: [],
    description: ["As a Victor developer", "In order to show off my idea", "I want to have an example feature to render"],
    keyword: "Feature",
    tags: [],
    location: "example.feature:2",
    name: "Example feature"
};


describe('Feature', () => {
    const featurePassed = TestUtils.renderIntoDocument(<Feature scenarios={TEST_FEATURE.elements} name={TEST_FEATURE.name} description={TEST_FEATURE.description} status="passed"/>);
    const featureFailed = TestUtils.renderIntoDocument(<Feature scenarios={TEST_FEATURE.elements} name={TEST_FEATURE.name} description={TEST_FEATURE.description} status="failed"/>);
    const featurePassedNode = ReactDOM.findDOMNode(featurePassed);
    const featureFailedNode = ReactDOM.findDOMNode(featureFailed);

    it('Shows the feature name from the feature object - passed', () => {
        const nameNode = featurePassedNode.getElementsByTagName('h1')[0];
        expect(nameNode.textContent).toBe('Example feature passed');
    });

    it('Shows the feature name from the feature object - failed', () => {
        const nameNode = featureFailedNode.getElementsByTagName('h1')[0];
        expect(nameNode.textContent).toBe('Example feature failed');
    });
    
    it("Shows a tag with the status of the feature - passed", () => {
        const tagNode = featurePassedNode.getElementsByClassName('tag')[0];
        expect(tagNode.getAttribute('class')).toBe('tag is-success is-medium');
    });

    it("Shows a tag with the status of the feature - failed", () => {
        const tagNode = featureFailedNode.getElementsByClassName('tag')[0];
        expect(tagNode.getAttribute('class')).toBe('tag is-danger is-medium');
    });

    it("Shows the description for the feature", () => {
       const descriptionNode = featurePassedNode.getElementsByTagName('p')[0];
        expect(descriptionNode.textContent).toBe("As a Victor developer\nIn order to show off my idea\nI want to have an example feature to render\n");
    });
});