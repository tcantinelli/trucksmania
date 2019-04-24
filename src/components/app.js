/* eslint-disable no-console */
import React, { Component } from "react";
import M from "materialize-css";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { signinUser } from "../actions";
//Components
import Header from "../components/header";
import BigPart from "../components/bigPart";

require("../style.css");

class App extends Component {
	constructor (props) {
		super(props);
		this.state = { credentials: { email: "", password: "" } };
		this.onChange = this.onChange.bind(this);
		this.onSave = this.onSave.bind(this);
	}

	componentWillMount () {
		document.addEventListener("DOMContentLoaded", function () {
			var elems = document.querySelectorAll(".modal");
			M.Modal.init(elems, {});
		});
	}



	onChange (event) {
		const field = event.target.name;
		const credentials = this.state.credentials;
		credentials[field] = event.target.value;
		return this.setState({ credentials: credentials });
	}

	onSave (event) {
		event.preventDefault();
		console.log(this.state.credentials);
		this.props.signinUser(this.state.credentials);
	}

	render () {
		return (
			<div className="container-fluid">
				<Header />
				<BigPart />
				<div id="modal1" class="modal loginModal">
					<div class="modal-content">
						<form className="col s8">
							<div className="row rowModal">
								<div className="input-field col s12">
									<i className="material-icons prefix">account_circle</i>
									<input id="email" type="email" name="email" className="validate" onChange={this.onChange} />
									<label for="email">Email</label>
									<span className="helper-text" data-error="Email incorrect" data-success="Email validé">Validation</span>
								</div>
							</div>
							<div className="row rowModal">
								<div className="input-field col s12">
									<i className="material-icons prefix">https</i>
									<input id="password" type="password" name="password" className="validate" onChange={this.onChange} />
									<label for="password">Mot de passe</label>
								</div>
							</div>
							<div className="row rowModal">
								<div className="input-field col s6 offset-s3">
									<p className="center-align">
										<label>
											<input type="checkbox" />
											<span>Se souvenir</span>
										</label>
									</p>
								</div>
							</div>
							<div className="row rowModal">
								<div className="input-field col s6 offset-s3 center-align">
									<button class="btn waves-effect" type="submit" name="action" onClick={this.onSave} >Connexion
										<i class="material-icons right">send</i>
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	...bindActionCreators(
		{signinUser}, dispatch)
});

export default connect(
	null,
	mapDispatchToProps
)(App);
