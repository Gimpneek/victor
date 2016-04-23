/**
 * Created by colinwren on 23/04/2016.
 */
import React from 'react';

export default class StepEditView extends React.Component {

    constructor(props, context){
        super(props, context);
        this.state = {
            name: this.props.name || '',
            handleChange: this.props.handleChange
        }
    }

    handleChange(event){
        this.setState({name: event.target.value});
        this.state.handleChange(event);
    }

    render() {
        const {changeEditMode} = this.props;
        return (
            <span>
                <input type="text" value={this.state.name} onChange={this.handleChange.bind(this)}/>
                <button className="button is-info">Run</button>
                <button className="button is-danger" onClick={changeEditMode}>Close</button>
            </span>
        )
    }
}