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
		return (
			<div className="container-fluid">
				{this.props.popMessage.toShow ?
					<PopMessage degree={this.props.popMessage.degree} message={this.props.popMessage.message} />
					: null}
				{this.props.user ? 
					this.props.user.email !== ''
						? 
						<div>
							<ul id="slide-out" class="sidenav sidenav-fixed">
								<li><a href="#!">First Sidebar Link</a></li>
								<li><a href="#!">Second Sidebar Link</a></li>
							</ul>
							<a href="#!" data-target="slide-out" class="sidenav-trigger"><i class="material-icons">menu</i></a>
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
