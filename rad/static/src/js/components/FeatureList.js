import React from 'react';

import FeatureListItem from './FeatureList/FeatureListItem';

export default class FeatureList extends React.Component{
	render(){
		const Features = [
			'Observation Entry',
			'Observation Analysis',
			'Policy Based Escalation'
		].map((name, i) => <FeatureListItem key={i} name={name}/>);


		return(
			<nav class="menu">
				<p class="menu-heading">
					Features
				</p>
				{Features}
			</nav>
		);
	}
}