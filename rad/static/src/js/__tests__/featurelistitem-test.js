jest.unmock('../components/FeatureList/FeatureListItem');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import FeatureListItem from '../components/FeatureList/FeatureListItem';


describe('Feature', () => {
    const active = TestUtils.renderIntoDocument(<FeatureListItem id="1" name="Active FeatureListItem" activeFeature="1"/>);
    const inactive = TestUtils.renderIntoDocument(<FeatureListItem id="2" name="Inactive FeatureListItem" activeFeature="1"/>);
    const activeNode = ReactDOM.findDOMNode(active);
    const inactiveNode = ReactDOM.findDOMNode(inactive);

    it('Shows the feature name from the featurelistitem object - active', () => {
        expect(activeNode.textContent).toBe('Active FeatureListItem');
    });

    it('Shows the feature name from the featurelistitem object - inactive', () => {
        expect(inactiveNode.textContent).toBe('Inactive FeatureListItem');
    });
    
    it("Has a link to the feature - active", () => {
        expect(activeNode.getAttribute('href')).toBe('/#/feature/1');
    });

    it("Has a link to the feature - inactive", () => {
        expect(inactiveNode.getAttribute('href')).toBe('/#/feature/2');
    });

    it("Sets the class to is-active when active", () => {
        expect(activeNode.getAttribute('class')).toBe('menu-block is-active');
    });

    it("Does not set the class to is-active when inactive", () => {
        expect(inactiveNode.getAttribute('class')).toBe("menu-block");
    });
});