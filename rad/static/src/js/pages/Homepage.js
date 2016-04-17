import React from 'react';

import FeatureList from '../components/FeatureList';
import FeatureStore from '../stores/FeatureStore';

export default class HomePage extends React.Component{
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
		const { features } = this.state;
		return (
			<div class="columns container is-fluid">
				<div class="column is-3">
					<FeatureList features={features}/>
				</div>
				<div class="column">
					<h1>Welcome</h1>
				</div>
			</div>
		);
	}
};