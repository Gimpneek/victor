import React from 'react';

export default class FeatureListItem extends React.Component{
	render(){
		const { name } = this.props;
		return (
			<a class="menu-block" href="#">{name}</a>
		)
	}
}