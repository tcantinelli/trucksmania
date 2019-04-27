import React, { Component } from 'react';

class SideCollection extends Component  {
	render() {
		return (
			<li class="collection-item avatar">
				<img src="images/yuna.jpg" alt="" class="circle"/>
				<span class="title">Title</span>
				<p>First Line <br/>
         Second Line
				</p>
				<a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
			</li>
		);
	}
}

export default SideCollection;