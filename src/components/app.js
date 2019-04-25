import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../containers/home";
import Admin from "../containers/admin";
//import RequireAuthentification from "../helpers/require-authentification";

require("../style.css");

export default class App extends Component {
	render () {
		return (
			<div>
				<Switch>
					<Route exact path="/" component={Home} />
					{/* <Route exact path="/ressources" component={RequireAuthentification(Ressources)} /> */}
					<Route exact path="/admin" component={Admin} />
				</Switch>
			</div>
		);
	}
}
