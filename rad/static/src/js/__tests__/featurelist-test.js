jest.unmock('../components/FeatureList');
jest.unmock('../components/FeatureList/FeatureListItem');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import FeatureList from '../components/FeatureList';

const TEST_FEATURELIST = [{
    elements: [],
    description: ["As a Victor developer", "In order to show off my idea", "I want to have an example feature to render"],
    keyword: "Feature",
    tags: [],
    location: "example.feature:2",
    name: "Example feature"
}];

describe('Feature', () => {
    const featureList = TestUtils.renderIntoDocument(<FeatureList features={TEST_FEATURELIST} activeFeature="1"/>);
    const featureListNode = ReactDOM.findDOMNode(featureList);

    it('Shows the feature name from the feature object - passed', () => {
        const titleNode = featureListNode.getElementsByClassName('menu-label')[0];
        expect(titleNode.textContent).toBe('Features');
    });

    it('Shows the feature name from the feature object - failed', () => {
        const listNode = featureListNode.getElementsByClassName('menu-list')[0];
        expect(listNode.textContent).toBe('Example feature');
    });

});