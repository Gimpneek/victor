import React from 'react';

import FeatureListItem from './FeatureList/FeatureListItem';

export default class FeatureList extends React.Component{
	render(){
		return(
			<nav class="menu">
				<p class="menu-heading">
					Features
				</p>
				<FeatureListItem name="Colin" />
			</nav>
		);
	}
}