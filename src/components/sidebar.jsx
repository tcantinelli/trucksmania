import React from 'react';
import SideCollection from '../components/sideCollection';

const SideItems = [
	{
		icon: 'supervisor_account',
		link: {
			title: 'Profil',
			adress: '#!'
		},
		count: 0
	},
	{
		icon: 'shopping_basket',
		link: {
			title: 'Articles',
			adress: '#!'
		},
		count: 0
	},
	{
		icon: 'gps_fixed',
		link: {
			title: 'Emplacements',
			adress: '#!'
		},
		count: 0
	},
	{
		icon: 'smartphone',
		link: {
			title: 'L\'application',
			adress: '#!'
		},
		count: 0
	}
];

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
						{SideItems.map(item => {
							return <SideCollection {...item} />;
						})}
						
					</ul>
				</li>
			</ul>
			<a href="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>
		</div>
	);
};

export default SideBar;