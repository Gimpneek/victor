import dispatcher from '../dispatcher';
import axios from 'axios';

export function reloadFeatures(){
    dispatcher.dispatch({type: "FETCH_FEATURES"});
    const url = location.protocol + '//' + location.hostname + (location.port ? ':'+location.port: '')
    axios(url + '/features')
    .then((data) => {
        const features = data.data
        console.log(features);
        dispatcher.dispatch({type: 'RECEIVE_FEATURES', features: features})
    })
    .catch((err) => {
        console.log('oops' + err);
    });
}