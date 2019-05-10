import React, { Component } from 'react';
import { connect } from 'react-redux';
import M from 'materialize-css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
//Components & Containers
import SideBar from './sidebar';
import Profil from '../containers/profil';
import Orders from '../containers/orders';
import Articles from '../containers/articles';
import Locations from '../containers/locations';
import Applications from '../components/applications';

require('../style/admin.css');

const items = [
	{
		path: '/admin',
		exact: true,
		component: Profil,
		title: 'Profil',
		icon: 'local_shipping',
		count: null
	},
	{
		path: '/admin/orders',
		component: Orders,
		title: 'Commandes',
		icon: 'shopping_basket',
		count: null
	},
	{
		path: '/admin/articles',
		component: Articles,
		title: 'Articles',
		icon: 'local_offer',
		count: null
	},
	{
		path: '/admin/locations',
		component: Locations,
		title: 'Emplacements',
		icon: 'place',
		count: null
	},
	{
		path: '/admin/applications',
		component: Applications,
		title: 'L\'application',
		icon: 'smartphone',
		count: null
	}
];

class Admin extends Component {
	componentWillMount() {
		//Initialisation sideBar
		document.addEventListener('DOMContentLoaded', function() {
			var elems = document.querySelectorAll('.sidenav');
			M.Sidenav.init(elems, {});
		});
	}
	
	render() {
		return (
			<Router>
				<div className="container-fluid">
					<SideBar items={items}/>
					{items.map((item, index) => {
						return <Route
							key={index}
							path={item.path}
							exact={item.exact}
							component={item.component}
						/>;
					})}
				</div>
			</Router>
		);
	}
}

const mapStateToProps = state => {
	return {
		user: state.user
	};
};
export default connect(
	mapStateToProps,
	null
)(Admin);
