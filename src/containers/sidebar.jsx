import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signoutUser } from '../actions';
import Button from '@material-ui/core/Button';
import { BASE_URL } from '../helpers/url';

class SideBar extends Component {

	handleClick(data) {
		this.props.action(data);
	}

	handleDeconnexion() {
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
								return (
									<li
										className="collection-item"
										style={collectioItemStyle}
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
													? <span className="new badge blue" style={rowStyle} data-badge-caption="" >{item.count}</span>
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
				<a href="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">Menu</i></a>
			</div>
		);
	}
}

//Style
const collectioItemStyle = {
	//padding: '0px'
};

const rowStyle = {
	margin: '0px !important' 
};

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
