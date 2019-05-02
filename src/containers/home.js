/* eslint-disable no-console */
import React, { Component } from 'react';
import { connect } from 'react-redux';
//Components
import Header from '../components/header';
import BigPart from '../components/bigPart';

class Home extends Component {
	componentWillMount() {
		if (this.props.isLoggedIn) {
			this.props.history.push('/admin');
		}
	}

	render() {
		return (
			<div className="container-fluid">
				<Header />
				<BigPart />
			</div>
		);
	}
}


const mapStateToProps = state => {
	return {
		isLoggedIn: state.authentification.isLoggedIn
	};
};

export default connect(
	mapStateToProps,
	null
)(Home);
