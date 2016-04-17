import React from 'react';

import FeatureListItem from './FeatureList/FeatureListItem';

export default class FeatureList extends React.Component{
	render(){
		const { activeFeature } = this.props;
		const { features } = this.props;
		const FeaturesList = features.map((feature, i) => {
			const featureName = feature.name;
			return <FeatureListItem key={i} name={featureName} id={i} activeFeature={activeFeature}/>;
		});


		return(
			<nav class="menu">
				<p class="menu-label">
					Features
				</p>
				<ul class="menu-list">
				    {FeaturesList}
				</ul>
			</nav>
		);
	}
}