import React from 'react';

import Scenario from './Feature/Scenario';

export default class Feature extends React.Component{
	render(){
		const { scenarios } = this.props;
		const Scenarios = scenarios.map((scenario, i) => <Scenario key={i} scenario={scenario} />);

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