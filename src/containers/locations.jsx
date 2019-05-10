import React, { Component } from 'react';
import {} from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Locations extends Component {
	render() {
		return (
			<div className="container-fluid adminContainer">
				Locations
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
)(Locations);