import 'rc-time-picker/assets/index.css';
import React, { Component } from 'react';
import { addPlace } from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DAYS } from '../helpers/days';
import PartTitle from '../components/part_title';
import Chip from '@material-ui/core/Chip';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
//MapBox
import { MB_APIKEY } from '../mapbox';
import MapboxMap, { Marker } from 'react-mapbox-wrapper';
import Geocoder from 'react-geocoder-autocomplete';

class Locations extends Component {
	constructor(props) {
		super(props);
		this.state = {
			flag: false, //Pas d'affichage du marker au chargement
			update: false, //Ajout ou update d'un emplacement
			title: '',
			address: '',
			week: DAYS,
			timeStart: moment('07:00', 'HH:mm'),
			timeEnd: moment('20:00', 'HH:mm'),
			latitude: null,
			longitude: null,
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
		case 'address':
			return 15;
		case 'poi':
			return 16;
		default:
			return 10;
		}
	}

	//Affichage marker
	onMapLoad(map) {
		this.map = map;
		this.forceUpdate();
	}

	//MAJ coordonnées quand marker modifié
	onDragMarkerAction = marker => {
		this.setState({
			latitude: marker.lat,
			longitude: marker.lng
		});
	}

	//Address selection
	onSearchAction = datas => {
		this.setState({
			flag: true, //Affichage marker
			title: this.state.title === '' ? datas.text : this.state.title,
			address: datas.place_name,
			latitude: datas.center[1],
			longitude: datas.center[0],
			zoom: this.giveMeTheZoom(datas.place_type[0])
		});
	}

	//Modification sur map
	onViewPortChange = datas => {
		this.setState({
			flag: true,
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

	//Choix heures
	onTimeChange = (type, moment) => {
		if (type === 'start') {
			this.setState({
				timeStart: moment
			});
		} else {
			this.setState({
				timeEnd: moment
			});
		}
	}

	clearAddPart = () => {
		this.setState({
			flag: false,
			update: false,
			title: '',
			address: '',
			week: [
				{
					value: 'Lundi',
					active: true
				},
				{
					value: 'Mardi',
					active: false
				},
				{
					value: 'Mercredi',
					active: false
				},
				{
					value: 'Jeudi',
					active: false
				},
				{
					value: 'Vendredi',
					active: false
				},
				{
					value: 'Samedi',
					active: false
				},
				{
					value: 'Dimanche',
					active: false
				}
			],
			timeStart: moment('07:00', 'HH:mm'),
			timeEnd: moment('20:00', 'HH:mm'),
			latitude: null,
			longitude: null,
			zoom: 4
		});
	}

	onSubmit = () => {
		const { title, address, week, timeStart, timeEnd, latitude, longitude, zoom } = this.state;

		//Datas de la requête POST
		const dataToSend = {
			idFT: this.props.idFT,
			title, 
			address,
			week,
			timeStart: timeStart.toISOString(true),
			timeEnd: timeEnd.toISOString(true),
			latitude,
			longitude,
			zoom
		};

		this.props.addPlace(dataToSend);
	}

	render() {
		return (
			<div className="container-fluid adminContainer">
				{/* ADD */}
				<div className="partContainer" >
					<PartTitle title={this.state.update ? 'Modifier' : 'Ajouter'} />
					<div className="row">
						{/* GeoCoder */}
						<div className="col s12 m6 subPartContainer">
							<Geocoder
								accessToken={MB_APIKEY}
								onSelect={this.onSearchAction}
								showLoader={true}
							/>
							{/* Title */}
							<h3 className="AddTitleText">Nom</h3>
							<input
								id="title" 
								type="text"
								value={this.state.title}
								placeholder="Nom de l'emplacement"
								onChange={this.onUpTitle.bind(this)} />
							{/* Week */}
							<h3 className="AddTitleText">Jours</h3>
							{this.state.week.map((day, index) => {
								return (
									<Chip
										key={index}
										label={day.value}
										onClick={this.upDays.bind(this, index)}
										color={day.active ? 'primary' : 'default'}
										className={'chipDay'}
										variant={day.active ? 'default' : 'outlined'}
									/>
								);
							})}
							{/* Times */}
							<h3 className="AddTitleText">Horaires</h3>
							<span>De:  </span>
							<TimePicker
								id={'start'}
								showSecond={false}
								value={this.state.timeStart}
								className="timeTextField"
								onChange={this.onTimeChange.bind(this, 'start')}
								format={'HH[h]mm'}
								minuteStep={15}
							/>
							<span>  à:  </span>
							<TimePicker
								id={'end'}
								showSecond={false}
								defaultValue={this.state.timeEnd}
								className="timeTextField"
								onChange={this.onTimeChange.bind(this, 'end')}
								format={'HH[h]mm'}
								minuteStep={15}
							/>
						</div>
						<div className="col s12 m6 subPartContainer">
							<div style={{ height: 400, width: 400 }}>
								<MapboxMap
									accessToken={MB_APIKEY}
									coordinates={{ lat: this.state.latitude || 46.227638, lng: this.state.longitude || 2.213749 }}
									zoom={this.state.zoom}
									withZoom
									onChange={this.onViewPortChange}
									onLoad={this.onMapLoad.bind(this)}
								/>
								{this.map && this.state.flag 
									? <Marker 
										coordinates={{ lat: this.state.latitude, lng: this.state.longitude }} 
										map={this.map}
										draggable={true}
										onDragEnd={this.onDragMarkerAction.bind(this)}
									/>
									: null}
							</div>
						</div>
						{/* VALIDATION */}
						<div className="row" >
							<div className="input-field col s6 offset-s3 center-align">
								<div className="row">
									<div className="col s12 m6 buttonRow">
										<button 
											className="btn red"
											onClick={this.clearAddPart}>Effacer
											<i className="material-icons right">clear</i>
										</button>
									</div>
									<div className="col s12 m6 buttonRow">
										<button 
											className="btn"
											disabled={this.state.latitude ? null : true}
											onClick={this.onSubmit}>{this.state.update ? 'Modifier' : 'Ajouter'}
											<i className="material-icons right">check</i>
										</button>
									</div>
								</div>
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
		{addPlace},
		dispatch
	)
});
export default connect(
	null,
	mapDispatchToProps
)(Locations);