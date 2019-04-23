import React, { Component } from "react";
import M from "materialize-css";
//Components
import Header from "../components/header";
import BigPart from "../components/bigPart";

require("../style.css");

class App extends Component {
	componentWillMount () {
		document.addEventListener("DOMContentLoaded", function () {
			var elems = document.querySelectorAll(".modal");
			M.Modal.init(elems, {});
		});
	}

	render () {
		return (
			<div className="container-fluid">
				<Header />
				<BigPart />
				<div id="modal1" class="modal loginModal">
					<div class="modal-content">
						<form className="col s8">
							<div className="row rowModal">
								<div className="input-field col s12">
									<i className="material-icons prefix">account_circle</i>
									<input id="email" type="email" className="validate" />
									<label for="email">Email</label>
									<span class="helper-text" data-error="Email incorrect" data-success="Email validé">Validation</span>
								</div>
							</div>
							<div className="row rowModal">
								<div className="input-field col s12">
									<i className="material-icons prefix">https</i>
									<input id="password" type="password" className="validate" />
									<label for="password">Mot de passe</label>
								</div>
							</div>
							<div className="row rowModal">
								<div className="input-field col s6 offset-s3">
									<p className="center-align">
										<label>
											<input type="checkbox" />
											<span>Se souvenir</span>
										</label>
									</p>
								</div>
							</div>
							<div className="row rowModal">
								<div className="input-field col s6 offset-s3 center-align">
									<button class="btn waves-effect" type="submit" name="action">Connexion
										<i class="material-icons right">send</i>
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
