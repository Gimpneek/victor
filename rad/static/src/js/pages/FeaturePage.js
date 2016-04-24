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
		const feature = features[activeFeature];
		if(!feature){
		    return (
		        <div class="container">
                    <div class="columns">
                        <div class="column is-3-desktop">
                            <FeatureList activeFeature={activeFeature} features={features}/>
                        </div>
                        <div class="column">
                            <div class="content">
                                <h1>Feature not found</h1>
                            </div>
                        </div>
                    </div>
                </div>
            );
		}
		const scenarios = (feature && feature.hasOwnProperty('elements')) ? feature.elements : [];
		const name = feature.name;
		const description = feature.description;
		const status = feature.status

		return (
		    <div class="container">
                <div class="columns">
                    <div class="column is-3-desktop">
                        <FeatureList activeFeature={activeFeature} features={features}/>
                    </div>
                    <div class="column">
                        <div class="content">
                            <Feature scenarios={scenarios} name={name} description={description} status={status}/>
                        </div>
                    </div>
                </div>
            </div>
		);
	}
};