import React, { Component } from 'react';

class Categorie extends Component {
	render() {
		const { cat } = this.props;
		return (
			<div>
				<img
					className="responsive-img"
					src={`../img/categories/${cat.image}`}
					alt={cat.image}
					style={categorieImageStyle}
				/>
				<div className="flow-text toolText" style={categorieTextStyle}>{cat.value}</div>
			</div>
		);
	}
}


/* Style */
const 
	categorieTextStyle = {
		fontSize: '1.3vw',
		color: '#181717'
	},
	categorieImageStyle = {
		width: '40px'
	};

export default Categorie;