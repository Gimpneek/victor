import React from 'react';

export default class Search extends React.Component{
	render() {
		return(
			<p class="control is-grouped">
				<input type="text" placeholder="Search"/>
				<button class="button">Search</button>
			</p>
		);
	}
}