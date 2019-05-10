import React, { Component } from 'react';
import {} from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import M from 'materialize-css';

class Orders extends Component {
	// componentWillMount() {
	// 	//Initialisation sideBar
	// 	document.addEventListener('DOMContentLoaded', function() {
	// 		var elems = document.querySelectorAll('.sidenav');
	// 		M.Sidenav.init(elems, {});
	// 	});
	// }
	render() {
		return (
			<div className="container-fluid adminContainer">
				Orders
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		user: state.user
	};
};

const mapDispatchToProps = dispatch => ({
	...bindActionCreators(
		{},
		dispatch
	)
});
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Orders);
