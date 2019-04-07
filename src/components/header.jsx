import React, { Component } from "react";

class Header extends Component {
	render () {
		return (
			<div className="row">
				<div className="col s10">
					<img
						className="responsive-img headerImage"
						src={"../img/Titre.png"}
						alt={
							"tool.title"
						}
					/>
				</div>
				<div className="col s2">
					<a class="waves-effect waves-light btn"><i class="material-icons left">cloud</i>button</a>
				</div>
			</div>
		);
	}
}

export default Header;
