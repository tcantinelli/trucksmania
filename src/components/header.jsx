import React, { Component } from "react";

class Header extends Component {
	render () {
		return (
			<div className="row valign-wrapper">
				<div className="col s11">
					<img
						className="responsive-img headerImage"
						src={"../img/Titre.png"}
						alt={
							"tool.title"
						}
					/>
				</div>
				<div className="col s1 buttonCol">
					<button data-target="loginModal" className="btn modal-trigger">Connexiocn</button>
				</div>
			</div>
		);
	}
}

export default Header;
