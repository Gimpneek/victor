import { EventEmitter } from 'events';

import dispatcher from '../dispatcher';


class FeatureStore extends EventEmitter{
    constructor() {
        super();
        this.features = [{
            id: 1,
            status: "passed",
            elements: [{
                name: "Addition",
                keyword: "Scenario",
                tags: [],
                steps: [{
                    name: "I have \"2\" apples",
                    keyword: "Given",
                    step_type: "given",
                    result: {
                        status: "passed",
                        duration: 0.0001289844512939453
                    },
                    match: {
                        location: "../../../../Users/colinwren/Documents/Projects/victor/rad/features/steps/example.py:4",
                        arguments: [{
                            name: "starting_apples",
                            value: "\"2\""
                        }]
                    },
                    location: "../../../../Users/colinwren/Documents/Projects/victor/rad/features/example.feature:8"
                }, {
                    name: "I get given \"3\" apples",
                    keyword: "When",
                    step_type: "when",
                    result: {
                        status: "passed",
                        duration: 9.608268737792969e-05
                    },
                    match: {
                        location: "../../../../Users/colinwren/Documents/Projects/victor/rad/features/steps/example.py:9",
                        arguments: [{
                            name: "more_apples",
                            value: "\"3\""
                        }]
                    },
                    location: "../../../../Users/colinwren/Documents/Projects/victor/rad/features/example.feature:9"
                }, {
                    name: "I should have \"5\" apples",
                    keyword: "Then",
                    step_type: "then",
                    result: {
                        status: "passed",
                        duration: 7.82012939453125e-05
                    },
                    match: {
                        location: "../../../../Users/colinwren/Documents/Projects/victor/rad/features/steps/example.py:14",
                        arguments: [{
                            name: "sum_of_apples",
                            value: "\"5\""
                        }]
                    },
                    location: "../../../../Users/colinwren/Documents/Projects/victor/rad/features/example.feature:10"
                }],
                location: "../../../../Users/colinwren/Documents/Projects/victor/rad/features/example.feature:7",
                type: "scenario"
            }],
            description: ["As a Victor developer", "In order to show off my idea", "I want to have an example feature to render"],
            keyword: "Feature",
            tags: [],
            location: "../../../../Users/colinwren/Documents/Projects/victor/rad/features/example.feature:2",
            name: "Example feature"
        }]
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
            case "RECEIVE_FEATURES": {
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