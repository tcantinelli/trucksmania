import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import M from "materialize-css";
//Components
import Header from "../components/header";
import BigPart from "../components/bigPart";

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

	componentWillMount () { 
		document.addEventListener("DOMContentLoaded", function () {
			var elems = document.querySelectorAll(".modal");
			M.Modal.init(elems, {});
		});
	}

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
			<div className="container-fluid">
				<Header />
				<BigPart />

				{/* Modal Structure */}
				<div id="loginModal" className="modal">
					<div className="modal-content">
						<h4>Modal Header</h4>
						<p>A bunch of text</p>
					</div>
					<div className="modal-footer">
						<a href="#!" className="modal-close waves-effect waves-green btn-flat">Agree</a>
					</div>
				</div>
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
