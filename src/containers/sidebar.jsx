import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signoutUser } from '../actions';
import Button from '@material-ui/core/Button';
import { BASE_URL } from '../helpers/url';

require('../style/sideBar.css');

class SideBar extends Component {

	handleClick(data) {
		this.props.action(data);
	}

	handleDeconnexion() {
		this.props.signoutUser();
	}

	getUserBackground = foodtruck => {
		const backStyle = {
			backgroundColor: 'white',
			backgroundSize: '300px auto',
			backgroundRepeat: 'no-repeat',
			margin: '0px !important'
		};
	
		foodtruck && foodtruck.images[0]
			? backStyle.backgroundImage = `url(${BASE_URL}/image/${foodtruck.images[0]._id})`
			: null;

		return backStyle;
	}

	render() {
		return (
			<div>
				<ul id="slide-out" className="sidenav sidenav-fixed">
					<li>
						<div className="row topContainer" style={this.getUserBackground(this.props.userInfos.foodtrucks[0])}>
							<div className="col s10 offset-s1 topSubContainer valign-wrapper">
								{this.props.userInfos.foodtrucks[0]
									? this.props.userInfos.foodtrucks[0].logo 
										? <img className="topImage" src={`${BASE_URL}/image/${this.props.userInfos.foodtrucks[0].logo._id}`} alt={this.props.userInfos.foodtrucks[0].logo.originalname} />
										: <img className="topImage" src="../img/logo_default.png" alt="Default logo" />
									: null}
								{this.props.userInfos.foodtrucks[0]
									? <span className="topSpan">{this.props.userInfos.foodtrucks[0].name }</span>
									: null}
							</div>
						</div>
						<ul className="collection rowStyle">
							{this.props.items.map((item, key) => {
								return (
									<li
										className="collection-item sidenav-close collectionItemStyle"
										key={key}
										onClick={this.handleClick.bind(this, item.component)}
										role="presentation"
									>
										<div className="row valign-wrapper rowStyle">

											<div className="col s1 left-align">
												{this.props.target === item.component
													? <i className="small material-icons">keyboard_arrow_right</i>
													: null}
											</div>
											<div className="col s2">
												<i className="small material-icons">{item.icon}</i>
											</div>
											<div className="col s6 valign-wrapper">
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
					<div className="closeButt center-align">
						<Button className="sidenav-close closeButt" size="small" variant="contained" color="secondary" onClick={this.handleDeconnexion.bind(this)}>Déconnexion</Button>
					</div>
				</ul>
				<a href="#!" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	...bindActionCreators(
		{signoutUser}, dispatch
	)
});

export default connect(
	null,
	mapDispatchToProps
)(SideBar);
