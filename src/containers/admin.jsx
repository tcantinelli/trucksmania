import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

require("../style.css");

class Admin extends Component {
	render () {
		return (
			<div className="container-fluid">
				<h4>Admin</h4>
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
