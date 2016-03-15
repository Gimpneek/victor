import React from 'react';

import Navigation from '../components/Navigation';

export default class Layout extends React.Component{
	render() {
		const {location} = this.props;
		const activeFeature = this.props.params.feature ? parseInt(this.props.params.feature) : 0;

		return (
			<div class="content container is-fluid">
				<section class="hero">
					<Navigation location={location}/>
				</section>
				<section class="section">
					{this.props.children}
				</section>
			</div>
		);
	}
};