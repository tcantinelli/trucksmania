import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';

class Main extends Component  {
	render() {
		return (
			<div className="containe-fluid adminContainer">
Main
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return { 

	};
};
export default connect(mapStateToProps, actions)(Main);