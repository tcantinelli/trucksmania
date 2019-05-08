import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../containers/home';
import Login from '../containers/login';
import Signup from '../containers/signup';
import Admin from '../containers/admin';
import RequireAuthentification from '../helpers/require-authentification';

export default class App extends Component {
	render() {
		return (
			<div className="app">
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/signin" component={Login} />
					<Route path="/signup" component={Signup} />
					<Route path="/admin" component={RequireAuthentification(Admin)} />
				</Switch>
			</div>
		);
	}
}
