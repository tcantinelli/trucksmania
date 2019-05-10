import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import M from 'materialize-css';
import { updateProfil } from '../actions';
//import { BASE_URL } from '../helpers/url';
//Components & Containers
import SideBar from './sidebar';

require('../style/admin.css');

const items = [
	{
		component: 'Profil',
		title: 'Profil',
		icon: 'local_shipping',
		count: null
	},
	{
		component: 'Orders',
		title: 'Commandes',
		icon: 'shopping_basket',
		count: null
	},
	{
		component: 'Articles',
		title: 'Articles',
		icon: 'local_offer',
		count: null
	},
	{
		component: 'Locations',
		title: 'Emplacements',
		icon: 'place',
		count: null
	},
	{
		component: 'Applications',
		title: 'L\'application',
		icon: 'smartphone',
		count: null
	}
];

class Admin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			item: 'Profil'
		};
	}

	//Affichage partie droite
	actionSideBar = item => {
		this.setState({item: item});
	};

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
				<SideBar items={items} action={this.actionSideBar.bind(this)}/>
				{getItem(rightView)}
				}}
			</div>
		);
	}
}

const getItem = item => {
	switch (item) {
	case 'Orders':
		return (
			<div className="container-fluid adminContainer">
			Orders
			</div>
		);
	case 'Articles':
		return (
			<div className="container-fluid adminContainer">
			Articles
			</div>
		);
	case 'Locations':
		return (
			<div className="container-fluid adminContainer">
			Locations
			</div>
		);
	case 'Applications':
		return (
			<div className="container-fluid adminContainer">
			Applications
			</div>
		);
	default:
		return (
			<div className="container-fluid adminContainer">
				PROFIL
			</div>
		);
	}
};

const mapDispatchToProps = dispatch => ({
	...bindActionCreators(
		{ updateProfil }, dispatch)
});

const mapStateToProps = state => {
	return {
		user: state.user,
		categories: state.categories
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Admin);
