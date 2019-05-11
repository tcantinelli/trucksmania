import React, { Component } from 'react';
import {} from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PopMessage from '../components/popMessage';

class Orders extends Component {

	render() {
		return (
			<div className="container-fluid adminContainer">
				<PopMessage degree="top" message="Ceci est un test" />
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
)(Orders);
