import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import M from 'materialize-css';
//Components & Containers
import SideBar from '../components/sidebar';

require('../style.css');

class Admin extends Component {
	componentWillMount() {
		document.addEventListener('DOMContentLoaded', function() {
			var elems = document.querySelectorAll('.sidenav');
			M.Sidenav.init(elems, {});
		});
	}
	
	render() {
		return (
			<div className="container-fluid">
				<SideBar />
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
		...bindActionCreators(
			{
			},
			dispatch
		)
	}),
	mapStateToProps = state => {
		return {
			projets: state.projects
		};
	};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Admin);
