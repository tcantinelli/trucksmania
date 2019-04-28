import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../containers/home';
import Signup from '../containers/signup';
import Admin from '../containers/admin';
import RequireAuthentification from '../helpers/require-authentification';

require('../style/home.css');

export default class App extends Component {
	render() {
		return (
			<div>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/signup" component={Signup} />
					<Route exact path="/admin" component={RequireAuthentification(Admin)} />
				</Switch>
			</div>
		);
	}
}
