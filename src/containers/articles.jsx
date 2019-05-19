import React, { Component } from 'react';
import {} from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
			price: 0.0,
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
									id="name" 
									type="text" 
									onChange={this.onUpdate.bind(this)} />
								<label for="name">Intitulé</label>
							</div>
							{/* PRICE */}
							<div className="row input-field">
								<input
									id="price" 
									type="number" 
									onChange={this.onUpdate.bind(this)} />
								<label for="price">Prix</label>
							</div>
							{/* DESCRIPTION */}
							<div class="row input-field">
								<textarea id="description" class="materialize-textarea" onChange={this.onUpdate.bind(this)}></textarea>
								<label for="description">Description</label>
							</div>
						</div>
						{/* IMAGE */}
						<div className="col s12 m6 articleSubPartContainer">
							<div className="row input-field"
								onChange={this.onUpdate.bind(this)}
								role="presentation">
								<div className="file-field input-field">
									<div className="btn">
										<span>Charger</span>
										<input type="file"/>
									</div>
									<div className="file-path-wrapper">
										<input className="file-path validate" type="text" placeholder="Charger une image" />
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
							<button className="btn waves-effect" onClick={this.onSubmit}>Ajouter
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
									<TableCell>image</TableCell>
									<TableCell align="center">Intitulé</TableCell>
									<TableCell align="center">Prix</TableCell>
									<TableCell align="center">Description</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{this.props.articles ? this.props.articles.map(article => 
									<TableRow key={article._id}>
										<TableCell component="th" scope="row" className="articleRowImage">
											{article.image}
										</TableCell>
										<TableCell align="center">{article.value}</TableCell>
										<TableCell align="center">{article.price}</TableCell>
										<TableCell align="center">{article.description}</TableCell>
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
		{},
		dispatch
	)
});
export default connect(
	null,
	mapDispatchToProps
)(Articles);