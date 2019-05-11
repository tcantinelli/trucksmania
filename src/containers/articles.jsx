import React, { Component } from 'react';
import {} from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

require('../style/admin.css');

class Articles extends Component {
	render() {
		return (
			<div className="container-fluid adminContainer">
				{this.props.testVar}
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	...bindActionCreators(
		{},
		dispatch
	)
});
export default connect(
	null,
	mapDispatchToProps
)(Articles);