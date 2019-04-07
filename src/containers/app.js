import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//import M from "materialize-css";
//Components
import Header from "../components/header";

//import { getAllProjects } from "../actions/index";

require("../style.css");

class App extends Component {
	constructor () {
		super();
		this.state = {
			width:
				window.innerWidth //Largeur de la fenetre
		};
		this.updateDimensions = this.updateDimensions.bind(
			this
		);
	}

	componentDidMount () {
		window.addEventListener(
			"resize",
			this
				.updateDimensions
		); //Largeur fenetre
	}

	componentWillMount () {}

	//Update width
	updateDimensions () {
		this.setState(
			{
				width:
					window.innerWidth
			}
		);
	}

	render () {
		return (
			<div className="container">
				<Header />
			</div>
		);
	}

	componentWillUnmount () {
		window.removeEventListener(
			"resize",
			this
				.updateDimensions
		);
	}
}

const mapDispatchToProps = dispatch => ({
		...bindActionCreators(
			{
			},
			dispatch
		)
	}),
	mapStateToProps = state => {
		return {
			projets: state.projects
		};
	};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
