import React from 'react';
import StepReadView from './Step/StepReadView';
import StepEditView from './Step/StepEditView';

export default class Step extends React.Component{
	constructor (props, context){
		super(props, context);
		this.state = {
			editMode: false,
			name: this.props.step.name
		};
	}
	changeEditMode(){
		this.setState({editMode: !this.state.editMode});
	}
	changeStep(event){
		this.setState({name: event.target.value});
	}
	render(){
		const { keyword } = this.props.step;
		const { result } = this.props.step;
		const status = (result) ? result.status : 'failed';
		const editView = <StepEditView name={this.state.name} changeEditMode={this.changeEditMode.bind(this)} handleChange={this.changeStep.bind(this)}/>;
		const readView = <StepReadView name={this.state.name} changeEditMode={this.changeEditMode.bind(this)}/>;
		const viewToRender = this.state.editMode ? editView : readView;
		const statusIcon = (status == 'passed') ? 'fa fa-check' : 'fa fa-exclamation';
		return (
			<div>
				<article class="media">
					<div class="media-left">
						<span class="icon is-large"><i className={statusIcon} aria-hidden="true"></i></span>
					</div>
					<div class="media-content">
						<div class="content step-content">
							<p><strong>{keyword}</strong> {viewToRender}</p>
						</div>
					</div>
				</article>
			</div>
		);
	}
}