import React, { Component } from 'react';
import { connect } from 'react-redux';
import M from 'materialize-css';
//Components & Containers
import SideBar from './sidebar';
import Profil from '../containers/profil';

require('../style/admin.css');

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
			<div className="container-fluid">
				<SideBar />
				<Profil user={this.props.user}/>
			</div>
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
