import React from 'react';

export default class Step extends React.Component{
	render(){
		const { keyword } = this.props.step;
		const { name } = this.props.step;
		const { status } = this.props.step;
		const statusClass = 'media ' + status;
		return (
			<div>
				<article class={statusClass}>
					<div class="media-left">
						<p class="image is-48x48">
							<img src="http://placehold.it/96x96"/>
						</p>
					</div>
					<div class="media-content">
						<div class="content">
							<p><strong>{keyword}</strong> {name}</p>
						</div>
					</div>
				</article>
			</div>
		);
	}
}