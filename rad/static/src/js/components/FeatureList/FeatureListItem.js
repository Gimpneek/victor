import React from 'react';

export default class FeatureListItem extends React.Component{
	constructor(){
		super()
		this.state = {
			isActive: false
		}
	}
	render(){
		const { name } = this.props;
		const activeClass = this.state.isActive ? 'is-active': '';
		return (
			<a class="menu-block {activeClass}" href="#">{name}</a>
		)
	}
}