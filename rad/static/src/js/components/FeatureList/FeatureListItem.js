import React from 'react';

export default class FeatureListItem extends React.Component{
	render(){
		const { id } = this.props;
		const { name } = this.props;
		const featureUrl = '/#/feature/' + id;
		const { activeFeature } = this.props;
		const activeClass = (id === activeFeature) ? 'menu-block is-active': 'menu-block';
		return (
			<a class={activeClass} href={featureUrl}>{name}</a>
		)
	}
}