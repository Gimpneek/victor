import React from 'react';

import Feature from '../components/Feature';
import FeatureList from '../components/FeatureList';
import FeatureStore from '../stores/FeatureStore';

export default class FeaturePage extends React.Component{
    constructor(){
        super();
        this.getFeatures = this.getFeatures.bind(this);
        this.state = {
            features: FeatureStore.getAll(),
        }
    }

    componentWillMount(){
        FeatureStore.on("change", this.getFeatures);
    }

    componentWillUnmount(){
        FeatureStore.removeListener("change", this.getFeatures);
    }

    getFeatures(){
        this.setState({
            features: FeatureStore.getAll(),
        });
    }

	render() {
		const activeFeature = parseInt(window.location.hash.match(/(\d+)/g)[0]);
		const { features } = this.state;
		const scenarios = features[activeFeature].scenarios;

		return (
			<div class="columns container is-fluid">
				<div class="column is-3">
					<FeatureList activeFeature={activeFeature} features={features}/>
				</div>
				<div class="column">
					<Feature scenarios={scenarios}/>
				</div>
			</div>
		);
	}
};