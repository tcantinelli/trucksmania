import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signoutUser } from '../actions';
import SideCollection from '../components/sideCollection';
import Button from '@material-ui/core/Button';
import { BASE_URL } from '../helpers/url';

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
								? this.props.user.foodtrucks[0].logo 
									? <img className="circle" src={`${BASE_URL}/image/${this.props.user.foodtrucks[0].logo._id}`} alt={this.props.user.foodtrucks[0].logo.originalname} />
									: <img className="circle" src="../img/logo_default.png" alt="Default logo" />
								: null}
							<a href="#email"><span className="email">{this.props.user.email}</span></a>
						</div>
						<ul className="collection">
							{this.props.items.map((item, key) => {
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
