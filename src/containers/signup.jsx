import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field, FormSection } from 'redux-form';
import { signupUser } from '../actions';
import * as validations from '../validations';
import Categorie from '../components/categorie';

require('../style/signup.css');

const FIELDS = {
	email: 'email',
	password: 'password',
	secondPassword: 'secondPassword'
};

class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeId: null
		};
	}
	handleSubmit = formValues => {
		formValues.foodtruck.category = this.state.activeId ? this.state.activeId : '5ca7fbfa04f3defa2159d601';
		this.props.signupUser(formValues, this.props.history);
	};

	handleClick(id) {
		this.setState({activeId: id});
	}

	//Fonction permettant de customiser le champ input, utile avec les validations, en parametres: tous les fields
	renderInputComponent = field => {
		return (
			<div className="row">
				<div className="input-field col s4 offset-s1">        
					<input {...field.input} type={field.type} id={field.label} className="form-control"/>
					<label htmlFor={field.label}>{field.label}</label>
					{field.meta.touched && field.meta.error && <span className="error">{field.meta.error}</span>}
				</div>
			</div>
		);
	};

	render() {
		return (
			<form>
				<div>
					<h4 className="center-align">Inscription</h4>
				</div>
				<div className="row">
					<div className="col s11 offset-s1">
						<h5 className="left-align">Le proprio</h5>
					</div>
					<div className="col s11 offset-s1">
						<Field
							name={FIELDS.email}
							component={this.renderInputComponent} //Au lieu de "input"
							type="text"
							label="email même un faux, c'est pas grave! :)"
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
					</div>
					<div className="col s11 offset-s1">
						<h5 className="left-align">Le food-truck</h5>
					</div>
					<div className="col s11 offset-s1">
						<FormSection name="foodtruck">
							<Field
								name="name"
								component={this.renderInputComponent}
								type="text"
								label="Nom"
								validate={validations.validateNotEmpty}
							/>
							<div className="col s11 offset-s1">
								<h5 className="left-align catgoriesTitle">Catégorie</h5>
							</div>
							<div className="col s11 offset-s1 catgoriesContainer">
								{this.props.categories.map(categorie => {
									return (
										<div
											className={`col s2 center-align ${categorie._id === this.state.activeId ? 'activeCategorieContainerStyle' : 'inactiveCategorieContainerStyle'}`}
											onClick={this.handleClick.bind(this, categorie._id)}
											role="presentation"
											key={categorie._id}>
											<Categorie cat={categorie} />
										</div>
									);
								})}
							</div>
						</FormSection>
					</div>
				</div>
				<div className="row inscriptionRow">
					<div className="col s12 center-align">
						<button className="btn btn-primary btn-raised"  onClick={this.props.handleSubmit(this.handleSubmit)}>
							Valider
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

const mapStateToProps = state => {
	return {
		categories: state.categories
	};
};

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
	mapStateToProps,
	mapDispatchToProps
)(signupForm);
