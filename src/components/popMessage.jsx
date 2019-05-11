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
			<div style={containerStyle}>
				<Fade top when={this.state.show}>
					<div style={boxStyle}>
						<span style={messageStyle}>{this.props.message}</span>
					</div>
				</Fade>
			</div>
		);
	}
}

//Style
const containerStyle = {
	//justifyContent: 'center',
		width: '100%'
	},
	boxStyle = {
		zIndex: 2,
		borderRadius: '5px',
		position: 'fixed',
		textAlign: 'center',
		backgroundColor: '#4bcaa4',
		width: '200px',
		height: 'content',
		padding: '10px',
		top: 0,
		left: '50%',
		margin: '5px 0px 0px -10px'
	},
	messageStyle = {
		fontSize: '0.8vw'
	};

export default PopMessage;