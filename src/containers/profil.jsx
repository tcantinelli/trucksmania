import React, { Component } from 'react';
import { updateUser } from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field, change } from 'redux-form';
import PartTitle from '../components/part_title';

const FIELDS = {
	name: 'name',
	category: 'category',
	logo: 'logo',
	images: 'images'
};

class Profil extends Component  {
	constructor(props) {
		super(props);
		this.state = {
			activeId: null
		};
	}

	componentWillUpdate(nextProps) {
		if (this.props.user.email !== nextProps.user.email) {
			this.props.change(FIELDS.name, nextProps.user.email);
		}
	}

	handleSubmit = formValues => {
		// formValues.foodtruck.category = this.state.activeId ? this.state.activeId : '5ca7fbfa04f3defa2159d601';
		// this.props.signupUser(formValues, this.props.history);
		console.log(formValues);
	};
	
	render() {
		return (
			<div className="container-fluid adminContainer">
				<form className="container formContainer">
					<div className="profilPartContainer" >
						<PartTitle title="Nom" />
						<div className="row insideRow valign-wrapper">
							<div className="row formRow">
								<div className="input-field col s12">
									<Field
										name={FIELDS.name}
										component="input"
										type="text"
									/>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return { 
		user: state.user
	};
};

const mapDispatchToProps = dispatch => ({
	...bindActionCreators(
		{ updateUser, change }, dispatch)
});

const profilForm = reduxForm({
	form: 'ProfilForm',
	fields: Object.keys(FIELDS)
})(Profil);

export default connect(mapStateToProps, mapDispatchToProps)(profilForm);