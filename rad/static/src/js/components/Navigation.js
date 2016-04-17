import React from 'react';

import Search from './Navigation/Search';

export default class Navigation extends React.Component{
	render() {
		return (
		    <div class="container">
                <nav class="navbar">
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
            </div>
		);
	}
}