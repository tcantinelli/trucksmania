import React, { Component } from 'react';
import { addArticle, deleteArticleFoodTruck, updateArticle } from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BASE_URL } from '../helpers/url';
import PartTitle from '../components/part_title';

require('../style/admin.css');

class Articles extends Component {
	constructor(props) {
		super(props);
		this.state = {
			update: false,
			value: '',
			price: '',
			description: '',
			image: null,
			idArticle: null,
			oldImageID: null
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
			update: false,
			value: '',
			price: '',
			description: '',
			image: null,
			idArticle: null,
			oldImageID: null
		});
		document.getElementById('filename').value = '';
		document.getElementById('inputFile').value = null;
	}

	//Chargement Article pour update
	loadArticle(article) {
		this.setState({
			update: true,
			value: article.value,
			price: article.price,
			description: article.description,
			image: null,
			idArticle: article._id,
			oldImageID: article.image ? article.image._id : null
		});
		document.getElementById('filename').value = article.image ? article.image.name : '';
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

		//Si update
		if (this.state.update) {
			dataToSend.idArticle = this.state.idArticle;
			dataToSend.oldImageID = this.state.oldImageID;
		}

		//Action
		this.state.update 
			? this.props.updateArticle(dataToSend)
			: this.props.addArticle(dataToSend);

		//RAZ zone upload images
		this.cleanAddArticle();
	};

	render() {
		return (
			<div className="container-fluid adminContainer">
				<div className="articlePartContainer" >
					<PartTitle title={this.state.update ? 'Modifier' : 'Ajouter'} />
					<br />
					{/* NOM */}
					<div className="row">
						<div className="col s12 m6 articleSubPartContainer">
							<div className="row input-field">
								<input
									id="value" 
									type="text"
									value={this.state.value}
									placeholder="Intitulé de l'article"
									onChange={this.onUpdate.bind(this)} />
							</div>
							{/* PRICE */}
							<div className="row input-field">
								<input
									id="price" 
									type="number"
									value={this.state.price}
									placeholder="Prix de l'article"
									onChange={this.onUpdate.bind(this)} />
							</div>
							{/* DESCRIPTION */}
							<div className="row input-field">
								<textarea
									id="description"
									className="materialize-textarea"
									value={this.state.description}
									placeholder="Description de l'article"
									onChange={this.onUpdate.bind(this)}></textarea>
							</div>
						</div>
						{/* IMAGE */}
						<div className="col s12 m6 articleSubPartContainer">
							<div className="row input-field"
								onChange={this.handleImageChange.bind(this)}
								role="presentation">
								<div className="file-field input-field">
									<div className="btn-small">
										<span>Charger</span>
										<input type="file" id="inputFile"/>
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
								<div className="articlePreviewContainer">
									{this.state.image
										? <img className="responsive-img articleImagePreview" src={URL.createObjectURL(this.state.image)} alt="Local" />
										: this.state.update && this.state.oldImageID
											? <img className="responsive-img articleImagePreview" src={`${BASE_URL}/image/${this.state.oldImageID}`} alt="Article" />
											: <img className="responsive-img articleImagePreview" src="../img/logo_default.png" alt="Default logo" />}
								</div>
							</div>
						</div>
					</div>
					{/* VALIDATION */}
					<div className="row" >
						<div className="input-field col s6 offset-s3 center-align">
							<div className="row">
								<div className="col s12 m6 buttonRow">
									<button 
										className="btn red"
										onClick={this.cleanAddArticle}>Effacer
										<i className="material-icons right">clear</i>
									</button>
								</div>
								<div className="col s12 m6 buttonRow">
									<button 
										className="btn"
										disabled={this.state.value === '' || this.state.price === '' ? true : null}
										onClick={this.onSubmit}>{this.state.update ? 'Modifier' : 'Ajouter'}
										<i className="material-icons right">check</i>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* LISTE DES ARTICLES */}
				<div className="articlePartContainer" >
					<div className="articleSubPartContainer" >
						<PartTitle title="Liste des articles" />
						<br />
						<table className="responsive-table">
							<thead>
								<tr>
									<th width="10%">Image</th>
									<th width="20%" className="centered">Intitulé</th>
									<th width="10%" className="centered">Prix</th>
									<th width="50%" className="centered">Description</th>
									<th width="10%" className="centered">Actions</th>
								</tr>
							</thead>
							<tbody>
								{this.props.onlineArticles ? this.props.onlineArticles.map(article => 
									<tr key={article._id}>
										<td width="10%">
											{article.image 
												? <img className="articleRowImage" src={`${BASE_URL}/image/${article.image._id}`} alt={article.image.name} />
												: <img className="articleRowImage" src="../img/logo_default.png" alt="Default logo" />}
										</td>
										<td width="20%" className="centered">{article.value}</td>
										<td width="10%" className="centered">{`${article.price} €`}</td>
										<td width="50%" className="centered">{article.description}</td>
										<td width="10%" className="row centered">
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
										</td>
									</tr>
								) : null}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	...bindActionCreators(
		{addArticle, deleteArticleFoodTruck, updateArticle}, dispatch
	)
});
export default connect(
	null,
	mapDispatchToProps
)(Articles);