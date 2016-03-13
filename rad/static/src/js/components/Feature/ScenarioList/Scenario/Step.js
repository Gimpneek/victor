import React from 'react';

export default class Step extends React.Component{
	render(){
		return (
			<div>
				<article class="media">
					<div class="media-left">
						<p class="image is-48x48">
							<img src="http://placehold.it/96x96"/>
						</p>
					</div>
					<div class="media-content">
						<div class="content">
							<p><strong>Given</strong> I do a thing</p>
						</div>
					</div>
				</article>
			</div>
		);
	}
}