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
		this.state = { credentials: { email: "", password: "", remember: false } };
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
		const field = event.target.id;
		const credentials = this.state.credentials;
		field === "remember" 
			? credentials[field] = event.target.checked
			: credentials[field] = event.target.value;
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
				<div id="modal1" className="modal loginModal">
					<div className="modal-content">
						<form className="col s8">
							<div className="row rowModal">
								<div className="input-field col s12">
									<i className="material-icons prefix">account_circle</i>
									<input id="email" type="email" onChange={this.onChange} />
									<label htmlFor="email">Email</label>
								</div>
							</div>
							<div className="row rowModal">
								<div className="input-field col s12">
									<i className="material-icons prefix">https</i>
									<input id="password" type="password" onChange={this.onChange} />
									<label htmlFor="password">Mot de passe</label>
								</div>
							</div>
							<div className="row rowModal">
								<div className="input-field col s6 offset-s3">
									<p className="center-align">
										<label>
											<input id="remember" type="checkbox" onChange={this.onChange}/>
											<span>Se souvenir</span>
										</label>
									</p>
								</div>
							</div>
							<div className="row rowModal">
								<div className="input-field col s6 offset-s3 center-align">
									<button className="btn waves-effect" type="submit" name="action" onClick={this.onSave} >Connexion
										<i className="material-icons right">send</i>
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
