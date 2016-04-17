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
		    <div class="container">
                <div class="columns">
                    <div class="column is-3-desktop">
                        <FeatureList features={features}/>
                    </div>
                    <div class="column">
                        <div class="content">
                            <h1>Welcome</h1>
                        </div>
                    </div>
                </div>
            </div>
		);
	}
};