/* eslint-disable no-mixed-spaces-and-tabs */
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { Field, reduxForm } from "redux-form";
import { signinUser } from "../actions";
import { connect } from "react-redux";

const FIELDS = {
	email: "email",
	password: "password"
};

class Signin extends Component {
	handleSubmit = credentials => {
		this.props.signinUser(credentials, this.props.history);
	};
	render () {
		return (
			<div id="loginModal" className="modal">
				<div className="modal-content">
					<form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
						<div className="row justify-content-md-center">
							<fieldset className="col-md-4 form-group">
								<label className="bmd-label-floating">Email</label>
								<Field
									name={FIELDS.email}
									component="input"
									type="text"
									className="form-control"
								/>
							</fieldset>
						</div>
						<div className="row justify-content-md-center">
							<fieldset className="col-md-4 form-group">
								<label className="bmd-label-floating">Password</label>
								<Field
									name={FIELDS.password}
									component="input"
									type="password"
									className="form-control"
								/>
							</fieldset>
						</div>
						<div className="row justify-content-md-center">
							<button
								type="submit"
								className="btn btn-primary btn-raised"
							>
								Connexion
  						</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

const signinForm = reduxForm({
	form: "signin",
	fields: Object.keys(FIELDS)
})(Signin);

const mapDispatchToProps = dispatch => ({
	...bindActionCreators({ signinUser }, dispatch)
});

export default connect(
	null,
	mapDispatchToProps
)(signinForm);
 