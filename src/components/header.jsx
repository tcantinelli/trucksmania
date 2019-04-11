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
					<a class="waves-effect waves-light btn">Connexion</a>
				</div>
			</div>
		);
	}
}

export default Header;
