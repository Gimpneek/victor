import React from 'react';

export default class Step extends React.Component{
	render(){
		const { keyword } = this.props.step;
		const { name } = this.props.step;
		const { result } = this.props.step;
		const status = (result) ? result.status : 'failed'
		const statusIcon = (status == 'passed') ? 'fa fa-check' : 'fa fa-exclamation';
		return (
			<div>
				<article class="media">
					<div class="media-left">
						<span class="icon is-large"><i className={statusIcon} aria-hidden="true"></i></span>
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