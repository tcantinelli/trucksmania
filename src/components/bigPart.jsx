import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

require('../style/bigPart.css');

class BigPart extends Component {
	render() {
		return (
			<div className="row">
				<div className="col s12 l6 homePartContainer">
					<div className="partLeft">
						<div className="row partText">
							<p>Une petite faim ? Trouver les food-trucks disponibles autour de vous et réservez votre repas sur votre mobile, grâce à l'application Trucks-Mania</p>
						</div>
						<div className="row partStoresContainer">
							<div className="col s6 partStores">
								<img className="responsive-img" src="../img/appleStore.png" alt={'Apple Store'}/>
							</div>
							<div className="col s6 partStores">
								<img className="responsive-img" src="../img/googlePlay.png" alt={'Google Play'}/>
							</div>
						</div>
					</div>
				</div>
				<div className="col s12 l6 homePartContainer">
					<div className="partLRight">
						<div className="row partText">
							<p>Propriétaire d'un food-truck ? Inscrivez vous et augmentez votre visibilté, fidélisez vos clients</p>
						</div>
						<Link className="nav-link" to="/signup">
							<Button size="medium" variant="contained" color="secondary">S'inscrire</Button>
						</Link>
					</div>
				</div>
			</div>
		);
	}
}

export default BigPart;
