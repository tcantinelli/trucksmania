import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateProfil, deleteImageFoodTruck } from '../actions';
import PartTitle from '../components/part_title';
import Categorie from '../components/categorie';
import Grid from '@material-ui/core/Grid';
import { BASE_URL } from '../helpers/url';

// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';

// Note: FilePondPluginImagePreview need to be installed separately
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

// Register the plugins
registerPlugin(FilePondPluginImagePreview);

class Profil extends Component  {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			categoryActiveId: null,
			localLogo: null,
			localImages: []
		};
	}

	componentWillMount() {
		this.setState({
			categoryActiveId: this.props.theFT.category
		});
	}

	//Update nom FT
	onUpdateName = event => {
		this.setState({name: event.target.value});
	}

	//Selection Category
	handleClick(id) {
		this.setState({categoryActiveId: id});
	}

	//Prise en charge du chargement de l'image, pour affichage preview et upload
	handleLogoChange(event) {
		if (event.target.files[0]) {
			this.setState({localLogo: event.target.files[0]});
		}
	}

	//Suppression image
	deleteImage(id, fileName) {
		//Datas to send
		const datas = {
			idFT: this.props.theFT._id,
			idImage: id,
			fileNameImage: fileName
		};
		this.props.deleteImageFoodTruck(datas);
	}

	onSubmit = () => {
		//Datas de la requête POST
		const dataToSend = {
			idFT: this.props.theFT._id,
			name: this.state.name,
			category: this.state.categoryActiveId !== this.props.theFT.category ? this.state.categoryActiveId : null,
			logo: this.state.localLogo ? this.state.localLogo : null,
			images: this.state.localImages
		};

		//Action
		this.props.updateProfil(dataToSend);

		//RAZ zone upload images
		this.setState({
			localImages: []
		});
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
								<input
									id="name" 
									type="text" 
									defaultValue={this.props.theFT.name}
									onChange={this.onUpdateName.bind(this)} />
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
											className={`center-align ${categorie._id === this.state.categoryActiveId ? 'activeCategorieContainerStyle' : 'inactiveCategorieContainerStyle'}`}
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
											<span>Modifier</span>
											<input type="file"/>
										</div>
										<div className="file-path-wrapper">
											<input className="file-path validate" type="text" defaultValue={this.props.theFT.logo ? this.props.theFT.logo.name : ''} placeholder="Charger une image" />
										</div>
									</div>
								</div>
								<div className="col s3 offset-s1">
									<div className="previewContainer">
										{this.state.localLogo
											? <img className="responsive-img" src={URL.createObjectURL(this.state.localLogo)} alt="Local" />
											: this.props.theFT.logo
												? <img className="responsive-img" src={`${BASE_URL}/image/${this.props.theFT.logo._id}`} alt={this.props.theFT.logo.name} />
												: <img className="responsive-img" src="../img/logo_default.png" alt="Default logo" />}
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* IMAGES */}
					<div className="profilImagesContainer" >
						<PartTitle title="Images" />
						<span>3 images maximum Formats: JPG,PNG et BMP</span><br/>
						<br/><span><u>En ligne</u></span>
						<div className="col s12 insideRow">
							<Grid container justify="space-evenly" spacing={24}>

								{this.props.theFT.images ? this.props.theFT.images.map(image => {
									return (
										<div
											className="center-align previewOnlineImage valign-wrapper"
											key={image._id}
										>
											<div className="boxDeleteContainer valign-wrapper"
												onClick={this.deleteImage.bind(this, image._id, image.filename)}
												role="presentation"
											>
												<i className="material-icons boxDeleteText">delete_forever</i>
											</div>
											<Grid item className="valign-wrapper">
												<img className="responsive-img" src={`${BASE_URL}/image/${image._id}`} alt={image.name} />
											</Grid>
										</div>
									);
								}) : null}
							</Grid>			
						</div>
						<br/><span><u>Ajouter</u>{` (${3 - this.props.theFT.images.length} / 3 disponible${3 - this.props.theFT.images.length > 1 ? 's' : ''})`}</span><br/>					
						<br/><FilePond
							ref={ref => this.pond = ref}
							files={this.state.localImages}
							allowMultiple={true}
							maxFiles={3 - this.props.theFT.images.length}
							// server="/api"
							onupdatefiles={fileItems => {
								// Set currently active file objects to this.state
								this.setState({
									localImages: fileItems.map(fileItem => fileItem.file)
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
		categories: state.categories,
		actualUser: state.user
	};
};

const mapDispatchToProps = dispatch => ({
	...bindActionCreators(
		{ updateProfil, deleteImageFoodTruck }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Profil);