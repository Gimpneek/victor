import dispatcher from '../dispatcher';
import axios from 'axios';

export function reloadFeatures(){
    dispatcher.dispatch({type: "FETCH_FEATURES"});
    axios('http://localhost:8000/features')
    .then((data) => {
        features = JSON.parse(data.data)
        console.log(features);
        dispatcher.dispatch({type: 'RECEIVE_FEATURES', features: features})
    })
    .catch((err) => {
        console.log('oops' + err);
    });
}