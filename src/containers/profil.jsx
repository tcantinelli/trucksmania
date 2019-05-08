import React, { Component } from 'react';
import { updateUser } from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field, change } from 'redux-form';
import PartTitle from '../components/part_title';
import Categorie from '../components/categorie';
import Grid from '@material-ui/core/Grid';
import { BASE_URL } from '../helpers/url';

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
			activeId: null,
			preview: null,
			localPreview: null
		};

		this.handleChange = this.handleChange.bind(this);
	}

	componentWillUpdate(nextProps) {
		if (this.props.user !== nextProps.user) {
			this.props.change(FIELDS.name, nextProps.user.foodtrucks[0].name);
			this.setState({
				activeId: nextProps.user.foodtrucks[0].category._id,
				preview: nextProps.user.foodtrucks[0].logo
			});
		}
	}

	renderUploadComponent = () => {
		return (
			<div className="file-field input-field">
				<div className="btn">
					<span>{this.state.preview ? 'Modifier' : 'Ajouter'}</span>
					<input type="file"/>
				</div>
				<div className="file-path-wrapper">
					<input className="file-path validate" type="text"/>
				</div>
			</div>
		);
	};

	handleClick(id) {
		this.setState({activeId: id});
	}

	//Prise en charge du chargement de l'image, pour affichage preview
	handleChange(event) {
		console.log('handle');
		
		this.setState({
			localPreview: URL.createObjectURL(event.target.files[0])
		});
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
					{/* LOGO */}
					<div className="profilPartContainer" >
						<PartTitle title="Logo" />
						<div className="row insideRow valign-wrapper">
							<div className="row valign-wrapper">
								<div className="input-field col s8"
									onChange={this.handleChange}
									role="presentation"
								>
									<Field
										name={FIELDS.logo}
										component={this.renderUploadComponent}
									/>
								</div>
								<div className="col s3 offset-s1">
									<div className="previewContainer">
										{this.state.localPreview
											? <img className="responsive-img" src={this.state.localPreview} alt="Local" />
											: this.state.preview 
												? <img className="responsive-img" src={`${BASE_URL}/image/${this.state.preview._id}`} alt={this.state.preview.originalname} />
												: <img className="responsive-img" src="../img/logo_default.png" alt="Default logo" />}
									</div>
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