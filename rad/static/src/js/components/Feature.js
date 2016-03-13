import React from 'react';

import Scenario from './Feature/Scenario';

export default class Feature extends React.Component{
	render(){
		const Scenarios = [
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
		].map((scenario, i) => <Scenario key={i} scenario={scenario} /> );

		return (
			<div>
				<h1>This is a feature</h1>
				<p>As a Front End Developer<br/>
				In order to learn React<br/>
				I want to be able to create a webapp</p>
				<div>
					{Scenarios}
				</div>
			</div>
		);
	}
}