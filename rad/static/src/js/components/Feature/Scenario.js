import React from 'react';

import Step from './Scenario/Step';

export default class Scenario extends React.Component{
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
							<h3><strong>Scenario:</strong> {name} <button class="is-pulled-right button is-info">Run</button></h3>
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