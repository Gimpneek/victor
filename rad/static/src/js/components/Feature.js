import React from 'react';

import Scenario from './Feature/Scenario';

export default class Feature extends React.Component{
	render(){
		const activeFeature = parseInt(window.location.hash.match(/(\d+)/g)[0]);
		const { scenarios } = this.props;
		const { name } = this.props;
	    var { description } = this.props;
	    const {status} = this.props;
 		const Scenarios = scenarios.map((scenario, i) => <Scenario key={i} scenario={scenario} scenario_id={i} feature_id={activeFeature} />);
        description = description.map((desc, i) => desc + '\n');
        const statusClass = (status == 'passed') ? 'tag is-success is-medium' : 'tag is-danger is-medium';
		return (
			<div>
				<h1>{ name } <span className={statusClass}>{status}</span></h1>
				<p>{description}</p>
				<div>
					{Scenarios}
				</div>
			</div>
		);
	}
}