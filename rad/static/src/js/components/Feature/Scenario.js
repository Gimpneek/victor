import React from 'react';
import ReactDOM from 'react-dom';
import Step from './Scenario/Step';
import axios from 'axios';
import dispatcher from '../../dispatcher';

export default class Scenario extends React.Component{
	constructor(props, context){
		super(props, context);
		this.state = {
			scenario_id: this.props.scenario_id
		}
	}
	getSteps(){
		const scenarioNode = ReactDOM.findDOMNode(this);
		const url = location.protocol + '//' + location.hostname + (location.port ? ':'+location.port: '');
		const steps = scenarioNode.getElementsByClassName('step-content');
		var step_content = '';
		for(var i = 0; i < steps.length; i++){
			const step = steps[i];
			step_content += step.textContent.replace('Edit', '') + '\n';
		}
		const scenario_id = this.state.scenario_id;
		axios.post(url + '/run/custom', {
			'scenario': step_content
		}).then((data) => {
			const scenario = data.data[0].elements[0];
			dispatcher.dispatch({
				type: 'RECEIVE_SCENARIOS',
				feature_id: parseInt(window.location.hash.match(/(\d+)/g)[0]),
				scenario_id: scenario_id,
				steps: scenario.steps
			});
		});
	}

	render(){
		const { name } = this.props.scenario;
		const { steps } = this.props.scenario;
		const Steps = steps.map((step, i) => <Step key={i} step={step} />);
		var statusPassed = ['failed'];
		if(steps.length > 0) {
			statusPassed = steps.map((step) => {
				if(step.result && step.result.status){
					return step.result.status;
				} else {
					return 'failed';
				}
			})
		}

		const statusClass = statusPassed.indexOf('failed') > -1 ? 'box failed' : 'box passed';
		return(
			<div className={statusClass}>
				<article class="media">
					<div class="media-content">
						<div class="content">
							<h3><strong>Scenario:</strong> {name} <button class="is-pulled-right button is-info" onClick={this.getSteps.bind(this)}>Run</button></h3>
							<div>
								{Steps}
							</div>
						</div>
					</div>
				</article>
			</div>
		);
	}
}