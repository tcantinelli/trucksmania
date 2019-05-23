import React, { Component } from 'react';
import {} from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BASE_URL } from '../helpers/url';
import PartTitle from '../components/part_title';

class Locations extends Component {
	constructor(props) {
		super(props);
		this.state = {
			update: false,
			title: '',
			adresse: '',
			latitude: '',
			longitude: ''
		};
	}
	render() {
		return (
			<div className="container-fluid adminContainer">
				{/* ADD */}
				<div className="partContainer" >
					<PartTitle title={this.state.update ? 'Modifier' : 'Ajouter'} />
				</div>
				{/* LIST */}
				<div className="partContainer" >
					<PartTitle title="Mes emplacements" />
				</div>
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
)(Locations);