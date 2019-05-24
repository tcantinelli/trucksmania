import React, { Component } from 'react';
import {} from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DAYS } from '../helpers/days';
import PartTitle from '../components/part_title';
import Chip from '@material-ui/core/Chip';
//MapBox
import { MB_APIKEY } from '../mapbox';
import MapboxMap from 'react-mapbox-wrapper';
import Geocoder from 'react-geocoder-autocomplete';

class Locations extends Component {
	constructor(props) {
		super(props);
		this.state = {
			update: false,
			title: '',
			adress: 'France',
			week: DAYS,
			latitude: 46.227638,
			longitude: 2.213749,
			zoom: 4
		};
	}

	//Determine Zoom
	giveMeTheZoom = type => {
		switch (type) {
		case 'country':
			return 4;
		case 'region':
			return 8;			
		case 'postcode':
		case 'district':
			return 10;
		case 'place':
			return 11;
		case 'locality':
		case 'neighborhood':
			return 12;
		case 'adress':
			return 15;
		case 'poi':
			return 16;
		default:
			return 10;
		}
	}

	//Adress selection
	onSearchAction = datas => {
		this.setState({
			adress: datas.place_name,
			latitude: datas.center[1],
			longitude: datas.center[0],
			zoom: this.giveMeTheZoom(datas.place_type[0])
		});
	}

	onViewPortChange = datas => {
		this.setState({
			latitude: datas.coordinates.lat,
			longitude: datas.coordinates.lng,
			zoom: datas.zoom
		});
	}

	//Update Title
	onUpTitle = event => {
		this.setState({
			title: event.target.value
		});
	}

		
	//Update Week
	upDays = index => {
		const newWeek = this.state.week;
		newWeek[index].active = !newWeek[index].active;

		this.setState({
			week: newWeek
		});
	}

	render() {
		return (
			<div className="container-fluid adminContainer">
				{/* ADD */}
				<div className="partContainer" >
					<PartTitle title={this.state.update ? 'Modifier' : 'Ajouter'} />
					<div className="row">
						<div className="col s12 m6 subPartContainer">
							<Geocoder
								accessToken={MB_APIKEY}
								onSelect={this.onSearchAction}
								showLoader={true}
							/>
							<span>Nom</span><br/>
							<div className="row input-field">
								<input
									id="title" 
									type="text"
									value={this.state.title}
									placeholder="Nom de l'emplacement"
									onChange={this.onUpTitle.bind(this)} />
							</div>
							<span>Jours</span><br/>
							{DAYS.map((day, index) => {
								return (
									<Chip
										key={index}
										label={day.value}
										onClick={this.upDays.bind(this, index)}
										color={day.active ? 'primary' : 'default'}
										className={'chipDay'}
									/>
								);
							})}
							<span>Horaires</span><br/>
						</div>
						<div className="col s12 m6 subPartContainer">
							<div style={{ height: 400, width: 400 }}>
								<MapboxMap
									accessToken={MB_APIKEY}
									coordinates={{ lat: this.state.latitude, lng: this.state.longitude }}
									zoom={this.state.zoom}
									withZoom
									onChange={this.onViewPortChange}
								/>
							</div>
						</div>

					</div>
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