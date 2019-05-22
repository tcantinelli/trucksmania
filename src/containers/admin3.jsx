import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import M from 'materialize-css';
import { updateProfil, signoutUser } from '../actions';
import { items } from '../helpers/sidebar_items';
//Components & Containers
import Button from '@material-ui/core/Button';
import { BASE_URL } from '../helpers/url';
import Profil from './profil';
import Orders from './orders';
import Articles from './articles';
import Locations from './locations';
import Applications from '../components/applications';
import PopMessage from '../components/popMessage';

require('../style/admin.css');

class Admin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			item: 'Profil'
		};
	}

	//Affichage partie droite
	handleClick(item) {
		this.setState({
			item: item
		});
	}

	handleDeconnexion() {
		this.props.signoutUser();
	}

	componentWillMount() {
		//Initialisation sideBar
		document.addEventListener('DOMContentLoaded', function() {
			var elems = document.querySelectorAll('.sidenav');
			M.Sidenav.init(elems, {});
			

		});	
	}
	
	render() {
		let rightView = this.state.item;
		const instance = M.Sidenav.getInstance(document.getElementById('slide-out'));
		return (
			<div className="container-fluid">
				{this.props.popMessage.toShow ?
					<PopMessage degree={this.props.popMessage.degree} message={this.props.popMessage.message} />
					: null}
				{this.props.user ? 
					this.props.user.email !== ''
						? 
						<div>
							<ul id="slide-out" className="sidenav">
								<li>
									<div className="user-view">
										{this.props.user.foodtrucks[0]
											? this.props.user.foodtrucks[0].logo 
												? <img className="circle" src={`${BASE_URL}/image/${this.props.user.foodtrucks[0].logo._id}`} alt={this.props.user.foodtrucks[0].logo.originalname} />
												: <img className="circle" src="../img/logo_default.png" alt="Default logo" />
											: null}
										<a href="#email"><span className="email">{this.props.user.email}</span></a>
									</div>
									<ul className="collection">
										{items.map((item, key) => {
											return (
												<li
													className="collection-item collectionItemStyle"
													key={key}
													onClick={this.handleClick.bind(this, item.component)}
													role="presentation"
												>
													<div className="row valign-wrapper rowStyle">
														<div className="col s2">
															<i className="small material-icons">{item.icon}</i>
														</div>
														<div className="col s7 valign-wrapper">
															{item.title}
														</div>
														<div className="col s3 valign-wrapper">
															{item.count
																? <span className="new badge blue rowStyle" data-badge-caption="" >{item.count}</span>
																: null					
															}
														</div>
													</div>	
												</li>
											);
										})}
									</ul>
								</li>
								<div className="deconnexion center-align">
									<Button size="small" variant="contained" color="secondary" onClick={this.handleDeconnexion.bind(this)}>Déconnexion</Button>
								</div>
							</ul>
							<a role="button" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>
							<Button size="small" variant="contained" color="secondary" onClick={instance.open()}>Déconnexion</Button>
						</div>
						: null
					: null}
				{this.props.user ? 
					this.props.user.email !== ''
						? getItem(rightView, this.props.user.foodtrucks[0]) : null
					: null}
			</div>
		);
	}
}

//Choix component partie droite
const getItem = (item, datas) => {
	switch (item) {
	case 'Orders':
		return <Orders />;
	case 'Articles':
		return <Articles onlineArticles={datas.articles} idFT={datas._id} />;
	case 'Locations':
		return <Locations />;
	case 'Applications':
		return <Applications />;
	default:
		return <Profil theFT={datas}/>;
	}
};

const mapDispatchToProps = dispatch => ({
	...bindActionCreators(
		{ updateProfil, signoutUser }, dispatch)
});

const mapStateToProps = state => {
	return {
		user: state.user,
		popMessage: state.popMessage
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Admin);
