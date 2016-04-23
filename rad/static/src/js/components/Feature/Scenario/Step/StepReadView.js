/**
 * Created by colinwren on 23/04/2016.
 */
import React from 'react';

export default class StepReadView extends React.Component {
    render() {
        const {name} = this.props;
        const {changeEditMode} = this.props;

        return (
            <span>
                <span className="step-name">{ name }</span>
                <button className="button" onClick={changeEditMode}>Edit</button>
            </span>
        )
    }
}