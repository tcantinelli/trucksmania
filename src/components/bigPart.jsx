import React, { Component } from 'react';

class BigPart extends Component {
	render () {
		return (
			<div className="row">
				<div className="col s12 l6 partContainer">
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
				<div className="col s12 l6 partContainer">
					<div className="partLRight">
						<div className="row partText">
							<p>Propriétaire d'un food-truck ? Inscrivez vous et augmentez votre visibilté, fidélisez vos clients</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default BigPart;
