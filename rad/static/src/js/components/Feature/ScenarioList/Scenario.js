import React from 'react';

import Step from './Scenario/Step';

export default class Scenario extends React.Component{
	render(){
		return(
			<div class="box">
				<article class="media">
					<div class="media-content">
						<div class="content">
							<h3><strong>Scenario:</strong> Meh</h3>
							<p><strong>Background:</strong> Some foo</p>
							<div>
								<Step/>
							</div>
						</div>
					</div>
				</article>
			</div>
		);
	}
}