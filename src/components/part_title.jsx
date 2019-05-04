import React from 'react';

const PartTitle = ({ title }) => {
	return (
		<div className="valign-wrapper" style={titleContainerStyle}>
			<div className="flow-text" style={titleStyle}>{title}</div>
		</div>
	);
};

//Style
const titleContainerStyle = {
		height: '3vh',
		width: 'fit-content',
		top: '-1.8vh',
		left: '2.2vh',
		backgroundColor: '#ffffff',
		position: 'absolute'
	},
	titleStyle = {
		fontSize: '2vw',
		color: '#181717',
		fontWeight: '600',
		padding: '0vh 1vh'
	};

export default PartTitle;
