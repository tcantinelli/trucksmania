import React, { Component } from "react";
import M from "materialize-css";
//Components
import Header from "../components/header";
import BigPart from "../components/bigPart";
//Containers
import Signin from "../containers/signin";

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
				<Signin />				
			</div>
		);
	}
}

export default App;
