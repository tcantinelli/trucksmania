import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

class Header extends Component {
	render() {
		return (
			<div className="row valign-wrapper">
				<div className="col s7 m9 xl10">
					<img
						className="responsive-img"
						style={headerImage}
						src={'../img/Titre.png'}
						alt={'Title'}
					/>
				</div>
				<div className="col s5 m3 xl2">
					<Link className="nav-link" to="/signin">
						<Button size="medium" variant="contained" color="primary">Se connecter</Button>
					</Link>
				</div>
			</div>
		);
	}
}

//Style
const headerImage = {
	maxHeight: '10vh'
};

export default Header;
