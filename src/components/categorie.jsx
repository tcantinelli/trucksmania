import React, { Component } from 'react';

class Categorie extends Component {
	render() {
		const { cat } = this.props;
		return (
			<div>
				<img
					src={`../img/categories/${cat.image}`}
					alt={cat.image}
					style={categorieImageStyle}
				/>
				<div style={categorieTextStyle}>{cat.value}</div>
			</div>
		);
	}
}

/* Style */
const 
	categorieTextStyle = {
		fontSize: window.innerWidth > 479 ? '14px' : '10px',
		color: '#181717'
	},
	categorieImageStyle = {
		width: window.innerWidth > 479 ? '40px' : '30px'
	};

export default Categorie;