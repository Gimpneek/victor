import dispatcher from '../dispatcher';
import axios from 'axios';

export function reloadFeatures(){
    dispatcher.dispatch({type: "FETCH_FEATURES"});
    axios('http://localhost:8000/features')
    .then((data) => {
        dispatcher.dispatch({type: 'RECEIVE_FEATURES', features: data})
    })
    .catch((err) => {
        console.log('oops' + err);
    });
}