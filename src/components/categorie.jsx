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
		fontSize: '14px',
		color: '#181717'
	},
	categorieImageStyle = {
		width: '40px'
	};

export default Categorie;