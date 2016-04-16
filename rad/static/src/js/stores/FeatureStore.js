import { EventEmitter } from 'events';

import dispatcher from '../dispatcher';


class FeatureStore extends EventEmitter{
    constructor() {
        super();
        this.features = [
			{
			    id: 1,
				title: 'Observation Entry',
				scenarios: [
					{
						title: 'Take an Observation',
						background: null,
						steps: [
							{
								keyword: 'Given',
								text: 'I am logged in as a nurse',
								status: 'passed'
							},
							{
								keyword: 'When',
								text: 'I submit an observation',
								status: 'failed'
							},
							{
								keyword: 'Then',
								text: 'I should be told my observation was successfully submitted',
								status: 'skipped'
							}
						]
					},
					{
						title: 'Take a NEWS Observation',
						background: 'As a nurse, In order for me to carry out the NEWS policy, I want to be able to see the NEWS score when I submit a NEWS observation',
						steps: [
							{
								keyword: 'Given',
								text: 'I am logged in as a nurse',
								status: 'passed'
							},
							{
								keyword: 'When',
								text: 'I submit an observation',
								status: 'failed'
							},
							{
								keyword: 'Then',
								text: 'I should be told the NEWS Score',
								status: 'skipped'
							},
							{
								keyword: 'And',
								text: 'I should be asked if I want so submit the observation',
								status: 'skipped'
							}
						]
					}
				]
			},
			{
			    id: 2,
				title: 'Observation Analysis',
				scenarios: [],
			},{
			    id: 3,
				title: 'Policy Based Escalation',
				scenarios: []
			},{
			    id: 4,
			    title: 'Workforce Analysis',
			    scenarios: []
			}
		];
    }

    createFeature(feature){
        const id = Date.now();
        this.features.push(feature);
        this.event("change");
    }

    getAll(){
        return this.features;
    }

    handleActions(action){
        switch(action.type){
            case "CREATE_FEATURE": {
                this.createFeature(action.feature);
                break;
            }
            case "RECIEVE_FEATURE": {
                this.features = action.features;
                this.emit("change");
                break;
            }
        }
    }
}

const featureStore = new FeatureStore();

dispatcher.register(featureStore.handleActions.bind(featureStore));

export default featureStore;