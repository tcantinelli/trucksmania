import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signoutUser } from '../actions';
import SideCollection from '../components/sideCollection';
import Button from '@material-ui/core/Button';

const SideItems = [
	{
		icon: 'local_shipping',
		link: {
			title: 'Profil',
			adress: '#!'
		},
		count: null
	},
	{
		icon: 'shopping_basket',
		link: {
			title: 'Commandes',
			adress: '#!'
		},
		count: null
	},
	{
		icon: 'local_offer',
		link: {
			title: 'Articles',
			adress: '#!'
		},
		count: null
	},
	{
		icon: 'place',
		link: {
			title: 'Emplacements',
			adress: '#!'
		},
		count: null
	},
	{
		icon: 'smartphone',
		link: {
			title: 'L\'application',
			adress: '#!'
		},
		count: null
	}
];

class SideBar extends Component {

	handleClick() {
		this.props.signoutUser();
	}

	render() {
		return (
			<div>
				<ul id="slide-out" className="sidenav sidenav-fixed">
					<li>
						<div className="user-view">
							{this.props.user.foodtrucks[0]
								? <img className="circle" src={`../img/logos/${this.props.user.foodtrucks[0].logo}`} alt={this.props.user.foodtrucks[0].logo} />
								: null}
							<a href="#email"><span className="email">{this.props.user.email}</span></a>
						</div>
						<ul className="collection">
							{SideItems.map((item, key) => {
								return <SideCollection {...item} key={key} />;
							})}
						</ul>
					</li>
					<div className="deconnexion center-align">
						<Button size="small" variant="contained" color="secondary" onClick={this.handleClick.bind(this)}>Déconnexion</Button>
					</div>
				</ul>
				<a href="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">Menu</i></a>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	...bindActionCreators(
		{signoutUser}, dispatch
	)
});

const mapStateToProps = state => {
	return {
		user: state.user
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SideBar);
