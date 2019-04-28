import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field } from 'redux-form';
import { signupUser } from '../actions';
import * as validations from '../validations';

const FIELDS = {
	pseudo: 'pseudo',
	password: 'password',
	secondPassword: 'secondPassword'
};

class Signup extends Component {
	handleSubmit = formValues => {
		this.props.signupUser(formValues, this.props.history);
	};

	//Fonction permettant de customiser le champ input, utile avec les validations, en parametres: tous les fields
	renderInputComponent = field => {
		return (
			<div className="row">
				<div className="col s4">        
					<label htmlFor={field.label}>{field.label}</label>
					<input {...field.input} type={field.type} id={field.label} />
					{field.meta.touched && field.meta.error && <span className="error">{field.meta.error}</span>}
				</div>
			</div>
		);
	};

	render() {
		return (
			<form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
				<div>
					<h1>Inscription</h1>
				</div>
				<Field
					name={FIELDS.email}
					component={this.renderInputComponent} //Au lieu de "input"
					type="text"
					label="email"
				/>
				<Field
					name={FIELDS.password}
					component={this.renderInputComponent} //Au lieu de "input"
					type="password"
					label="Mot de passe"
				/>
				<Field
					name={FIELDS.secondPassword}
					component={this.renderInputComponent} //Au lieu de "input"
					type="password"
					label="Répetez le mot de passe"
				/>
				<div>
					<div className="row justify-content-md-center">
						<button type="submit" className="btn btn-primary btn-raised">
							Inscription
  					</button>
					</div>
				</div>
			</form>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	...bindActionCreators(
		{signupUser}, dispatch
	)
});

function validate(formValues) {
	const errors = {};
	errors.email = validations.validateEmail(formValues.email);
	errors.password = validations.validateNotEmpty(formValues.password);
	errors.secondPassword = validations.validateEqual(
		formValues.password,
		formValues.secondPassword
	);
	return errors;
}

const signupForm = reduxForm({
	form: 'SignupForm',
	fields: Object.keys(FIELDS),
	validate
})(Signup);

export default connect(
	null,
	mapDispatchToProps
)(signupForm);
