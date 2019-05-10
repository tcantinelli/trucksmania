import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import M from 'materialize-css';
import { updateProfil } from '../actions';
import { items } from '../helpers/sidebar_items';
//import { BASE_URL } from '../helpers/url';
//Components & Containers
import SideBar from './sidebar';
import Profil from './profilV2';
import Orders from './orders';
import Articles from './articles';
import Locations from './locations';
import Applications from '../components/applications';

require('../style/admin.css');

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

//Choix component partie droite
const getItem = item => {
	switch (item) {
	case 'Orders':
		return <Orders />;
	case 'Articles':
		return <Articles />;
	case 'Locations':
		return <Locations />;
	case 'Applications':
		return <Applications />;
	default:
		return <Profil />;
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
