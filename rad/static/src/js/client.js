import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Layout from './pages/Layout';
import HomePage from './pages/HomePage';
import FeaturePage from './pages/FeaturePage';
import * as FeatureActions from './actions/FeatureActions';

const app = document.getElementById('app');

ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/" component={Layout}>
			<IndexRoute component={HomePage}></IndexRoute>
			<Route path="/feature/:feature" name="feature" component={FeaturePage}></Route>
		</Route>
	</Router>
	, app);

FeatureActions.reloadFeatures();