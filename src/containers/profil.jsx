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
			idFT: null,
			name: '',
			categoryActiveId: null,
			onlineLogo: null,
			localLogo: null,
			localImages: [],
			onlineImages: []
		};
	}

	componentWillMount() {
		this.setState({
			name: this.props.actualUser.foodtrucks[0].name,
			onlineLogo: this.props.actualUser.foodtrucks[0].logo,
			categoryActiveId: this.props.actualUser.foodtrucks[0].category,
			onlineImages: this.props.actualUser.foodtrucks[0].images
		});
	}

	
	
	componentWillUpdate(nextProps) {
		if (this.props.actualUser !== nextProps.actualUser) {
			this.setState({
				name: nextProps.actualUser.foodtrucks[0].name,
				onlineLogo: nextProps.actualUser.foodtrucks[0].logo,
				categoryActiveId: nextProps.actualUser.foodtrucks[0].category,
				onlineImages: this.props.actualUser.foodtrucks[0].images
			});
		}
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
			idFT: this.props.actualUser.foodtrucks[0]._id,
			idImage: id,
			fileNameImage: fileName
		};
		this.props.deleteImageFoodTruck(datas);
	}

	onSubmit = () => {
		const dataToSend = {
			idFT: this.props.actualUser.foodtrucks[0]._id,
			name: this.state.name,
			category: this.state.categoryActiveId !== this.props.actualUser.foodtrucks[0].category._id ? this.state.categoryActiveId : null,
			logo: this.state.localLogo ? this.state.localLogo : null,
			images: this.state.localImages
		};

		this.props.updateProfil(dataToSend);

		// console.log(dataToSend);
	};

	render() {
		console.log('Render');
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
											<input className="file-path validate" type="text" defaultValue={this.state.onlineLogo ? this.state.onlineLogo.name : ''} placeholder="Charger une image" />
										</div>
									</div>
								</div>
								<div className="col s3 offset-s1">
									<div className="previewContainer">
										{this.state.localLogo
											? <img className="responsive-img" src={URL.createObjectURL(this.state.localLogo)} alt="Local" />
											: this.state.onlineLogo 
												? <img className="responsive-img" src={`${BASE_URL}/image/${this.state.onlineLogo._id}`} alt={this.state.onlineLogo.name} />
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

								{this.props.actualUser.foodtrucks[0].images ? this.props.actualUser.foodtrucks[0].images.map(image => {
									return (
										<div
											className="center-align previewOnlineImage valign-wrapper"
											key={image._id}
											onClick={this.deleteImage.bind(this, image._id, image.filename)}
											role="presentation"
										>
											<div className="boxDeleteContainer valign-wrapper">
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
						<br/><span><u>Ajouter</u>{` (${3 - this.state.onlineImages.length} / 3 disponible${3 - this.state.onlineImages.length > 1 ? 's' : ''})`}</span><br/>					
						<br/><FilePond
							ref={ref => this.pond = ref}
							files={this.state.localImages}
							allowMultiple={true}
							maxFiles={3 - this.state.onlineImages.length}
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