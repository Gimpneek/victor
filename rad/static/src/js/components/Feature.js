import React from 'react';

import ScenarioList from './Feature/ScenarioList';

export default class Feature extends React.Component{
	render(){
		return (
			<div>
				<h1>This is a feature</h1>
				<p>As a Front End Developer<br/>
				In order to learn React<br/>
				I want to be able to create a webapp</p>
				<ScenarioList/>
			</div>
		);
	}
}