import React from 'react';

import Search from './Navigation/Search';

export default class Navigation extends React.Component{
	render() {
		return (
			<nav class="navbar container is-fluid">
				<div class="navbar-left">
					<div class="navbar-item">
						<p class="title"><a href="/#/">Victor</a></p>
					</div>
				</div>
				<div class="navbar-right">
					<div class="navbar-item">
						<Search/>
					</div>
				</div>
			</nav>
		);
	}
}