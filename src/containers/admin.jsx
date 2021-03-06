import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import M from 'materialize-css';
import { updateProfil } from '../actions';
import { items } from '../helpers/sidebar_items';
//Components & Containers
import SideBar from './sidebar';
import Profil from './profil';
import Orders from '../components/orders';
import Articles from './articles';
import Locations from './locations';
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
	actionSideBar = item => {
		this.setState({
			item: item
		});
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
				{this.props.popMessage.toShow ?
					<PopMessage degree={this.props.popMessage.degree} message={this.props.popMessage.message} />
					: null}
				<SideBar userInfos={this.props.user} items={items} action={this.actionSideBar.bind(this)} target={this.state.item} />
				{this.props.user ? 
					this.props.user.email !== '' && this.props.orders
						? getItem(rightView, this.props.user.foodtrucks[0], this.props.orders) : null
					: null}
			</div>
		);
	}
}

//Choix container partie droite
const getItem = (item, datas, orders) => {
	switch (item) {
	case 'Orders':
		return <Orders orders={orders} />;
	case 'Articles':
		return <Articles onlineArticles={datas.articles} idFT={datas._id} />;
	case 'Locations':
		return <Locations places={datas.places} idFT={datas._id} />;
	default:
		return <Profil theFT={datas} />;
	}
};

const mapDispatchToProps = dispatch => ({
	...bindActionCreators(
		{ updateProfil }, dispatch)
});

const mapStateToProps = state => {
	return {
		user: state.user,
		popMessage: state.popMessage,
		orders: state.orders
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Admin);
