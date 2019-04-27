import React from 'react';
import SideCollection from '../components/sideCollection';

const SideBar = ({ user }) => {
	return (
		<div>
			<ul id="slide-out" className="sidenav sidenav-fixed">
				<li>
					<div className="user-view">
						<div className="background">
						</div>
						{user.foodtrucks[0]
							? <img className="circle" src={`../img/logos/${user.foodtrucks[0].logo}`} alt={user.foodtrucks[0].logo} />
							: null}
						<a href="#name"><span className="name">{user.pseudo}</span></a>
						<a href="#email"><span className="email">{user.email}</span></a>
					</div>
					<ul class="collection">
						<SideCollection />
					</ul>
				</li>
			</ul>
			<a href="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>
		</div>
	);
};

export default SideBar;