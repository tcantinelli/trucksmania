/* Librairy Fade => npm install react-reveal --save
arguments:
	message: Texte à afficher
	degree: niveau d'alerte entre => 
		Success (green)
		Information (blue)
		Warning (orange)
		Error (red)
A utiliser avec la props popMessage du store
*/
import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';

class PopMessage extends Component  {
	constructor(props) {
		super(props);
		this.state = { show: false };
	}

	componentDidMount() {
		this.setState({show: true}, () => {
			setTimeout(() => {
				this.setState({show: false});
			}, 2000);
		});
	}

	render() {
		return (
			<div style={
				{backgroundColor: getColor(this.props.degree),
					...containerStyle}}>
				<Fade top when={this.state.show}>
					<div style={getBoxStyle(this.props.degree)}>
						<span style={messageStyle}>
							<i class="material-icons">{getIcon(this.props.degree)}</i> {this.props.message}
						</span>
					</div>
				</Fade>
			</div>
		);
	}
}

function getColor(degree) {
	switch (degree) {
	case 'Success':
		return '#28e1c0';
	case 'Information':
		return '#28c0e1';
	case 'Warning':
		return '#e1ab28';
	default:
		return '#f9574e';
	}
}

function getIcon(degree) {
	switch (degree) {
	case 'Success':
		return 'check';
	case 'Information':
		return 'info_outline';
	case 'Warning':
		return 'warning';
	default:
		return 'error_outline';
	}
}

//Style
const containerStyle = {
		width: '100%'
	},
	messageStyle = {
		fontSize: '1.2vw'
	};

function getBoxStyle(degree) {
	return {
		zIndex: 2,
		borderRadius: '5px',
		position: 'fixed',
		textAlign: 'center',
		backgroundColor: getColor(degree),
		width: 'content',
		height: 'content',
		padding: '10px',
		top: 0,
		left: '50%',
		margin: '5px 0px 0px -10px'
	};
}

export default PopMessage;