import React, { Component } from 'react';

class Header extends Component {
	render() {
		return (
			<div className="row valign-wrapper">
				<div className="col s7 m9 xl10">
					<img
						className="responsive-img headerImage"
						src={
							'../img/Titre.png'
						}
						alt={
							'tool.title'
						}
					/>
				</div>
				<div className="col s5 m3 xl2">
					<button data-target="modal1" className="btn modal-trigger buttonCol">Se connecter</button>
				</div>
			</div>
		);
	}
}

export default Header;
