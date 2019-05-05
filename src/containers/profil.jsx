import React, { Component } from 'react';
import { updateUser } from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field, change } from 'redux-form';
import PartTitle from '../components/part_title';
import Categorie from '../components/categorie';
import Grid from '@material-ui/core/Grid';

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
			activeId: '5ca7fbfa04f3defa2159d601'
		};
	}

	componentWillUpdate(nextProps) {
		if (this.props.user !== nextProps.user) {
			this.props.change(FIELDS.name, nextProps.user.foodtrucks[0].name);
			console.log(nextProps.user.foodtrucks[0]);
			this.setState({activeId: nextProps.user.foodtrucks[0].category._id});
		}
	}

	handleClick(id) {
		this.setState({activeId: id});
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
					{/* NOM */}
					<div className="profilPartContainer" >
						<PartTitle title="Nom" />
						<div className="row insideRow valign-wrapper">
							<div className="row">
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
					{/* Categorie */}
					<div className="profilPartContainer" >
						<PartTitle title="Catégorie" />
						<div className="row insideRow center-align">
							<Grid container justify="space-around" spacing={40}>
								{this.props.categories.map(categorie => {
									return (
										<div
											className={`center-align ${categorie._id === this.state.activeId ? 'activeCategorieContainerStyle' : 'inactiveCategorieContainerStyle'}`}
											onClick={this.handleClick.bind(this, categorie._id)}
											role="presentation"
											key={categorie._id}>
											<Grid item>
												<Categorie cat={categorie} />
											</Grid>
										</div>
									);
								})}
							</Grid>		
						</div>
					</div>
				</form>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return { 
		user: state.user,
		categories: state.categories
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