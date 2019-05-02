import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import M from 'materialize-css';
//Components & Containers
import SideBar from './sidebar';
import Main from '../containers/main';
//Redux
import { getUser } from '../actions';

require('../style/admin.css');

class Admin extends Component {
	componentWillMount() {
		//Recup datas User
		this.props.getUser();
		
		//Initialisation sideBar
		document.addEventListener('DOMContentLoaded', function() {
			var elems = document.querySelectorAll('.sidenav');
			M.Sidenav.init(elems, {});
		});
	}
	
	render() {
		return (
			<div className="container-fluid">
				<SideBar user={this.props.user}/>
				<Main />
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
		...bindActionCreators(
			{getUser}, dispatch
		)
	}),
	mapStateToProps = state => {
		return {
			user: state.user
		};
	};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Admin);
