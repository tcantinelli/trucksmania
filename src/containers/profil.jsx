import React, { Component } from 'react';
import { updateUser } from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Profil extends Component  {
	constructor(props) {
		super(props);
		this.state = {
			localUser: null
		};
		// this.onChange = this.onChange.bind(this);
	}

	componentWillMount() {
		this.setState({localUser: this.props.user});
	}
	
	render() {
		return (
			<div className="container-fluid adminContainer">
				{this.props.user.email}
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
		{ updateUser }, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Profil);