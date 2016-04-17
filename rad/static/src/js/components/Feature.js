import React from 'react';

import Scenario from './Feature/Scenario';

export default class Feature extends React.Component{
	render(){
		const { scenarios } = this.props;
		const { name } = this.props;
	    var { description } = this.props;
	    const {status} = this.props;
 		const Scenarios = scenarios.map((scenario, i) => <Scenario key={i} scenario={scenario} />);
        description = description.map((desc, i) => desc + '\n')
        const statusClass = status == 'passed' ? 'tag is-success' : 'tag is-danger';
		return (
			<div>
				<h1>{ name } <span class={statusClass}>{status}</span></h1>
				<p>{description}</p>
				<div>
					{Scenarios}
				</div>
			</div>
		);
	}
}