import React, { Component } from 'react';
import { addArticle, deleteArticleFoodTruck } from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BASE_URL } from '../helpers/url';
import PartTitle from '../components/part_title';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

require('../style/admin.css');

class Articles extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: '',
			price: '',
			description: '',
			image: null
		};
	}

	//Update nouvel Article
	onUpdate = (event) => {
		switch (event.target.id) {
		case 'value':
			this.setState({value: event.target.value});
			break;
		case 'price':
			this.setState({price: event.target.value});
			break;
		case 'description':
			this.setState({description: event.target.value});
			break;
		case 'image':
			this.setState({image:  event.target.files[0]});
			break;
		default:
			break;
		}
	}

	//Affichage preview image article
	handleImageChange(event) {
		if (event.target.files[0]) {
			this.setState({image: event.target.files[0]});
		}
	}

	//RAZ champs Ajouter article
	cleanAddArticle = () => {
		this.setState({
			value: '',
			price: '',
			description: '',
			image: null
		});
		document.getElementById('filename').value = '';
	}

	//Chargement Article pour update
	loadArticle(article) {

	}

	//Suppression Article
	deleteArticle(articleID) {
		//Datas to send
		const datas = {
			idFT: this.props.idFT,
			idArticle: articleID
		};
		this.props.deleteArticleFoodTruck(datas);
	}

	onSubmit = () => {
		//Datas de la requête POST
		const dataToSend = {
			idFT: this.props.idFT,
			value: this.state.value,
			price: this.state.price,
			description: this.state.description,
			image: this.state.image
		};

		//Action
		this.props.addArticle(dataToSend);

		//RAZ zone upload images
		this.cleanAddArticle();
	};

	render() {
		return (
			<div className="container-fluid adminContainer">
				<div className="articlePartContainer" >
					<PartTitle title="Ajouter" />
					<br />
					{/* NOM */}
					<div className="row">
						<div className="col s12 m6 articleSubPartContainer">
							<div className="row input-field">
								<input
									id="value" 
									type="text"
									value={this.state.value}
									onChange={this.onUpdate.bind(this)} />
								<label htmlFor="name">Intitulé</label>
							</div>
							{/* PRICE */}
							<div className="row input-field">
								<input
									id="price" 
									type="number"
									value={this.state.price}
									onChange={this.onUpdate.bind(this)} />
								<label htmlFor="price">Prix</label>
							</div>
							{/* DESCRIPTION */}
							<div className="row input-field">
								<textarea
									id="description"
									className="materialize-textarea"
									value={this.state.description}
									onChange={this.onUpdate.bind(this)}></textarea>
								<label htmlFor="description">Description</label>
							</div>
						</div>
						{/* IMAGE */}
						<div className="col s12 m6 articleSubPartContainer">
							<div className="row input-field"
								onChange={this.handleImageChange.bind(this)}
								role="presentation">
								<div className="file-field input-field">
									<div className="btn">
										<span>Charger</span>
										<input type="file"/>
									</div>
									<div className="file-path-wrapper">
										<input
											id="filename"
											className="file-path validate"
											type="text"
											placeholder="Charger une image" />
									</div>
								</div>
							</div>
							<div className="row center-align">
								<div className="articlePreviewConatiner">
									{this.state.image
										? <img className="responsive-img articleImagePreview" src={URL.createObjectURL(this.state.image)} alt="Local" />
										: <img className="responsive-img articleImagePreview" src="../img/logo_default.png" alt="Default logo" />}
								</div>
							</div>
						</div>
					</div>
					{/* VALIDATION */}
					<div className="row" >
						<div className="input-field col s6 offset-s3 center-align">
							
							<button 
								className="btn waves-effect"
								disabled={this.state.value === '' || this.state.price === '' ? true : null}
								onClick={this.onSubmit}>Ajouter
								<i className="material-icons right">check</i>
							</button>
						</div>
					</div>
				</div>
				{/* LISTE DES ARTICLES */}
				<div className="articlePartContainer" >
					<div className="articleSubPartContainer" >
						<PartTitle title="Liste des articles" />
						<br />
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Image</TableCell>
									<TableCell align="center">Intitulé</TableCell>
									<TableCell align="center">Prix</TableCell>
									<TableCell align="center">Description</TableCell>
									<TableCell align="center">Actions</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{this.props.onlineArticles ? this.props.onlineArticles.map(article => 
									<TableRow key={article._id}>
										<TableCell component="th" scope="row">
											{article.image 
												? <img className="articleRowImage" src={`${BASE_URL}/image/${article.image}`} alt={article.image} />
												: <img className="articleRowImage" src="../img/logo_default.png" alt="Default logo" />}
										</TableCell>
										<TableCell align="center">{article.value}</TableCell>
										<TableCell align="center">{article.price}</TableCell>
										<TableCell align="center">{article.description}</TableCell>
										<TableCell align="center">
											<div className="row">
												<div className="col articleLoadIcon center-align valign-wrapper"
													onClick={this.loadArticle.bind(this, article)}
													role="presentation"
												>
													<i className="material-icons boxUpdateText">edit</i>
												</div>
												<div className="col articleDeleteIcon center-align valign-wrapper"
													onClick={this.deleteArticle.bind(this, article._id)}
													role="presentation"
												>
													<i className="material-icons boxDeleteText">delete_forever</i>
												</div>
											</div>
										</TableCell>
									</TableRow>
								) : null}
							</TableBody>
						</Table>
					</div>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	...bindActionCreators(
		{addArticle, deleteArticleFoodTruck}, dispatch
	)
});
export default connect(
	null,
	mapDispatchToProps
)(Articles);