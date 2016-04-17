import React from 'react';

import Step from './Scenario/Step';

export default class Scenario extends React.Component{
	render(){
		const { name } = this.props.scenario;
		const { background } = this.props.scenario;
		const { steps } = this.props.scenario;
		const { status } = this.props.scenario;
		const Steps = steps.map((step, i) => <Step key={i} step={step} />)
		const statusPassed = steps.reduce((a, b) => {
		    if(b.result){
		        return (b.result.status == 'passed');
		    }
		    return false;
		})
		const statusClass = statusPassed ? 'box passed' : 'box failed';
		return(
			<div class={statusClass}>
				<article class="media">
					<div class="media-content">
						<div class="content">
							<h3><strong>Scenario:</strong> {name}</h3>
							<p><strong>Background:</strong> {background}</p>
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