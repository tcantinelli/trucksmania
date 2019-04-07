import React, { Component } from "react";

class Header extends Component {
	render () {
		return (
			<div>
				<div className="row">
					<div className="col s12">
						<img
							className="responsive-img"
							src={"../img/Titre.png"}
							alt={
								"tool.title"
							}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col s5 bigPart">
					</div>
					<div className="col s5 bigPart">
					</div>
				</div>
			</div>
		);
	}
}

export default Header;
