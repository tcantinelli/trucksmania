import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateProfil } from '../actions';
import PartTitle from '../components/part_title';
import Categorie from '../components/categorie';
import Grid from '@material-ui/core/Grid';
import { BASE_URL } from '../helpers/url';

// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

// Register the plugins
registerPlugin(FilePondPluginImagePreview);

class Profil extends Component  {
	constructor(props) {
		super(props);
		this.state = {
			idFT: null,
			name: '',
			activeId: null,
			preview: null,
			localPreview: null,
			localFile: null,
			images: [

			]
		};
	}

	
	componentWillMount() {
		this.setState({
			name: this.props.actualUser.foodtrucks[0].name,
			logo: this.props.actualUser.foodtrucks[0].logo
				? this.props.actualUser.foodtrucks[0].logo.filename
				: null,
			activeId: this.props.actualUser.foodtrucks[0].category,
			preview: this.props.actualUser.foodtrucks[0].logo
		});
	}
	

	componentWillUpdate(nextProps) {
		if (this.props.actualUser !== nextProps.actualUser) {
			this.setState({
				name: nextProps.actualUser.foodtrucks[0].name,
				logo: nextProps.actualUser.foodtrucks[0].logo.filename,
				activeId: nextProps.actualUser.foodtrucks[0].category,
				preview: nextProps.actualUser.foodtrucks[0].logo
			});
		}
		// console.log(nextProps.actualUser);
	}

	//Update nom FT
	onUpdateName = event => {
		this.setState({name: event.target.value});
	}

	handleClick(id) {
		this.setState({activeId: id});
	}

	//Prise en charge du chargement de l'image, pour affichage preview et upload
	handleLogoChange(event) {
		if (event.target.files[0]) {
			this.setState({
				localPreview: URL.createObjectURL(event.target.files[0]),
				localFile: event.target.files[0]
			});
		}
	}

	onSubmit = () => {
		const dataToSend = {
			idFT: this.props.actualUser.foodtrucks[0]._id,
			name: this.state.name,
			category: this.state.activeId !== this.props.actualUser.foodtrucks[0].category._id ? this.state.activeId : null,
			logo: this.state.preview !== this.state.localPreview ? this.state.localFile : null,
			images: this.state.images
		};

		this.props.updateProfil(dataToSend);

		// console.log(dataToSend);
	};

	render() {
		return (
			<div className="container-fluid adminContainer">
				<div className="container formContainer">
					{/* NOM */}
					<div className="profilPartContainer" >
						<PartTitle title="Nom" />
						<div className="row">
							<div className="input-field col s12 m6 offset-m3">
								<input id="name" type="text" value={this.state.name} onChange={this.onUpdateName.bind(this)} />
							</div>
						</div>
					</div>
					{/* Categorie */}
					<div className="profilPartContainer" >
						<PartTitle title="Catégorie" />
						<div className="col s12 insideRow">
							<Grid container justify="space-evenly" spacing={32}>
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
									onChange={this.handleLogoChange.bind(this)}
									role="presentation">
									<div className="file-field input-field">
										<div className="btn">
											<span>{this.state.preview ? 'Modifier' : 'Ajouter'}</span>
											<input type="file"/>
										</div>
										<div className="file-path-wrapper">
											<input className="file-path validate" type="text" defaultValue={this.state.preview ? this.state.preview.name : ''} placeholder="Charger une image" />
										</div>
									</div>
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
					{/* IMAGES */}
					<div className="profilImagesContainer" >
						<PartTitle title="Images" />
						<span>3 images maximum Formats: JPG,PNG et BMP</span>						
						<FilePond
							ref={ref => this.pond = ref}
							files={this.state.images}
							allowMultiple={true}
							maxFiles={3}
							// server="/api"
							onupdatefiles={fileItems => {
								// Set currently active file objects to this.state
								this.setState({
									images: fileItems.map(fileItem => fileItem.file)
								});
							}}
						/>
					</div>
					{/* VALIDATION */}
					<div className="row" >
						<div className="input-field col s6 offset-s3 center-align">
							<button className="btn waves-effect" onClick={this.onSubmit}>Valider
								<i className="material-icons right">check</i>
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return { 
		categories: state.categories
	};
};

const mapDispatchToProps = dispatch => ({
	...bindActionCreators(
		{ updateProfil }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Profil);