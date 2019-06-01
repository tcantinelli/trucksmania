import 'rc-time-picker/assets/index.css';
import React, { Component } from 'react';
import { addPlace, updatePlace, deletePlace } from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DAYS } from '../helpers/days';
import PartTitle from '../components/part_title';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
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
			update: false, //Ajout ou update d'un emplacement,
			shouldSubmit: false,
			title: '',
			address: '',
			week: DAYS,
			timeStart: moment('07:00', 'HH:mm'),
			timeEnd: moment('20:00', 'HH:mm'),
			latitude: null,
			longitude: null,
			zoom: 4,
			idPlace: null
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
			shouldSubmit: true,
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
			// flag: true,
			// shouldSubmit: true,
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

	//Chargement Place pour update
	loadPlace(place) {
		const {title, address, week, timeStart, timeEnd, latitude, longitude, zoom} = place;
		this.setState({
			flag: true,
			update: true,
			shouldSubmit: true,
			title,
			address,
			week,
			timeStart: moment(timeStart),
			timeEnd: moment(timeEnd),
			latitude,
			longitude,
			zoom,
			idPlace: place._id
		});
	}
	
	//Suppression Place
	deletePlace(idPlace) {
		//Datas to send
		const datas = {
			idFT: this.props.idFT,
			idPlace
		};
		this.props.deletePlace(datas);
	}

	//RAZ
	clearAddPart = () => {
		this.setState({
			flag: false,
			update: false,
			shouldSubmit: false,
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
			zoom: 4,
			idPlace: null
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

		//Ajout id place à modifier si update
		if (this.state.update) {
			dataToSend.idPlace = this.state.idPlace;
		}
		
		this.state.update ? this.props.updatePlace(dataToSend) : this.props.addPlace(dataToSend);

		//RAZ
		this.clearAddPart();
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
								value={this.state.timeEnd}
								className="timeTextField"
								onChange={this.onTimeChange.bind(this, 'end')}
								format={'HH[h]mm'}
								minuteStep={15}
							/>
						</div>
						{/* Map */}
						<div className="col s12 m6 subPartContainer center-align">
							<h3 className="AddTitleText">{this.state.flag ? 'Affinez la position en déplaçant le marqueur' : ''}</h3>
							<div style={{ height: 400, width: 'auto' }} className="mapContainer center-align">
								<MapboxMap
									accessToken={MB_APIKEY}
									className="map"
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
											disabled={!this.state.shouldSubmit}
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
					<div className="col s12 insideRow">
						<Grid 
							container
							justify="center"
							alignItems="center"
							spacing={32}
						>
							{this.props.places.map(place => {
								return (
									<Grid item key={place._id}> 
										<div className="row listPlacesContainer">
											<div className="col s6">
												<div className="row listPlacesSubLeftTop">
													<img
														className="placeImg"
														src={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s-marker+285A98(
															${place.longitude},${place.latitude})/${place.longitude},${place.latitude},${place.zoom}/200x200?access_token=${MB_APIKEY}`}
														alt={place.title} />
												</div>
												<div className="row listPlacesSubLeftBottom center-align valign-wrapper">
													<Grid
														container
														direction="row"
														justify="space-evenly"
														alignItems="center"
													>
														<Grid item className="loadIcon center-align valign-wrapper"
															onClick={this.loadPlace.bind(this, place)}
															role="presentation"
														>
															<i className="material-icons boxUpdateText">edit</i>
														</Grid>
														<Grid item className="deleteIcon center-align valign-wrapper"
															onClick={this.deletePlace.bind(this, place._id)}
															role="presentation"
														>
															<i className="material-icons boxDeleteText">delete_forever</i>
														</Grid>
													</Grid>
												</div>
											</div>
											<div className="col s6 listPlacesSubRight">
												<Grid
													container
													direction="column"
													justify="space-between"
													alignItems="stretch"
													className="listPlacesSubRight"
												>
													{place.title !== ''
														? <Grid item>
															{place.title}
														</Grid>
														: null}
													<Grid item>
														{place.address}
													</Grid>
													<Grid item>
														{place.week.filter(dayTested => dayTested.active).map((day) => {
															return (
																<Chip
																	key={day.value}
																	label={day.value.slice(0, 2)}
																	color="primary"
																	className={'chipDayXS'}
																	variant="outlined"
																/>
															);
														})}
													</Grid>
													<Grid item>
														{`De ${moment(place.timeStart).format('HH[h]mm').toString()} à ${moment(place.timeEnd).format('HH[h]mm').toString()}`}
													</Grid>
												</Grid>
											</div>
										</div>
									</Grid>
								);
							})}
						</Grid>			
					</div>
				</div>
			</div>
		);
	}
}



const mapDispatchToProps = dispatch => ({
	...bindActionCreators(
		{addPlace, updatePlace, deletePlace},
		dispatch
	)
});
export default connect(
	null,
	mapDispatchToProps
)(Locations);