import React from 'react';

import FeatureList from '../components/FeatureList';

export default class HomePage extends React.Component{
	render() {
		const features = [
			{
				title: 'Observation Entry',
				scenarios: [
					{
						title: 'Take an Observation',
						background: null,
						steps: [
							{
								keyword: 'Given',
								text: 'I am logged in as a nurse',
								status: 'passed'
							},
							{
								keyword: 'When',
								text: 'I submit an observation',
								status: 'failed'
							},
							{
								keyword: 'Then',
								text: 'I should be told my observation was successfully submitted',
								status: 'skipped'
							}
						]
					},
					{
						title: 'Take a NEWS Observation',
						background: 'As a nurse, In order for me to carry out the NEWS policy, I want to be able to see the NEWS score when I submit a NEWS observation',
						steps: [
							{
								keyword: 'Given',
								text: 'I am logged in as a nurse',
								status: 'passed'
							},
							{
								keyword: 'When',
								text: 'I submit an observation',
								status: 'failed'
							},
							{
								keyword: 'Then',
								text: 'I should be told the NEWS Score',
								status: 'skipped'
							},
							{
								keyword: 'And',
								text: 'I should be asked if I want so submit the observation',
								status: 'skipped'
							}
						]
					}
				]
			},
			{
				title: 'Observation Analysis',
				scenarios: [],
			},{
				title: 'Policy Based Escalation',
				scenarios: []
			}
		];
		return (
			<div class="columns container is-fluid">
				<div class="column is-3">
					<FeatureList activeFeature={activeFeature} features={features}/>
				</div>
				<div class="column">
					<h1>Welcome</h1>
				</div>
			</div>
		);
	}
};