import React from 'react';

import Navigation from './Navigation';
import FeatureList from './FeatureList';
import Feature from './Feature';

export default class Layout extends React.Component{
	render() {
		return (
			<div class="content container is-fluid">
				<section class="hero">
					<Navigation/>
				</section>
				<section class="section">
					<div class="columns container is-fluid">
						<div class="column is-3">
							<FeatureList/>
						</div>
						<div class="column">
							<Feature/>
						</div>
					</div>
				</section>
			</div>
		);
	}
};