/* 
Expansion panel:
https://material-ui.com/components/expansion-panels/
*/

import React, { Component } from 'react';
import PartTitle from './part_title';
import moment from 'moment/moment.js';
import { BASE_URL } from '../helpers/url';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';

class Orders extends Component {
	constructor(props) {
		super(props);
		this.state = {
			panelEnCoursExpanded: null,
			panelTermineesExpanded: null
		};
	}

	//Calcul Prix total
	getTotal(order) {
		let price = 0.0;
		order.elements.forEach(function(element) {
			price += element.article.price * element.quantity;
		});
		return price;
	}

	//Hide / Show de l'expansionPanel En Cours
	handleEnCoursChange = (index) => {
		for (let i = 0; i < this.props.orders.filter(order => moment(order.dateOrder) >= moment()).length; i++) {
			if (parseInt(index, 10) === i || this.state.panelEnCoursExpanded === null) {
				this.setState({
					panelEnCoursExpanded: index
				});
			}
		}
	};

	//Hide / Show de l'expansionPanel Terminees
	handleTermineesChange = (index) => {
		for (let i = 0; i < this.props.orders.filter(order => moment(order.dateOrder) < moment()).length; i++) {
			if (parseInt(index, 10) === i || this.state.panelTermineesExpanded === null) {
				this.setState({
					panelTermineesExpanded: index
				});
			}
		}
	};

	render() {
		//console.log(moment());
		return (
			<div className="container-fluid adminContainer">
				{/* Liste en Cours */}
				<div className="partContainer" >
					<PartTitle title="En cours" />
					<br />
					{this.props.orders ? this.props.orders.filter(
						order => moment(order.dateOrder) >= moment())
						.map((order, index) => 
							<ExpansionPanel id={index} key={order._id} expanded={this.state.panelEnCoursExpanded === parseInt(index, 10)} onClick={this.handleEnCoursChange.bind(this, index)}>
								<ExpansionPanelSummary >
									<span className="titleRow">{moment(order.dateOrder).format('DD/MM/YYYY').toString()}</span>
									<span className="titleRow">{order.client.email}</span>
									<span className="titleRow">{`${this.getTotal(order)} €`}</span>
								</ExpansionPanelSummary>
								<ExpansionPanelDetails>
									<table>
										<tbody>
											{order.elements.map(element => 
												<tr key={`${order._id}/${element._id}`}>
													<td width="20%"></td>
													<td width="20%">
														<img className="articleRowImage" src={`${BASE_URL}/image/${element.article.image}`} alt={element.article.image} />
													</td>
													<td width="20%">{element.article.value}</td>
													<td width="20%">{element.quantity}</td>
													<td width="20%">{`${element.article.price} €`}</td>
												</tr>
											)}
										</tbody>
									</table>
								</ExpansionPanelDetails>
							</ExpansionPanel>
						) : null}
				</div>
				{/* Liste Terminées */}
				<div className="partContainer" >
					<PartTitle title="Terminées" />
					<br />
					{this.props.orders ? this.props.orders.filter(
						order => moment(order.dateOrder) < moment())
						.map((order, index) => 
							<ExpansionPanel id={index} key={order._id} expanded={this.state.panelTermineesExpanded === parseInt(index, 10)} onClick={this.handleTermineesChange.bind(this, index)}>
								<ExpansionPanelSummary >
									<span className="titleRow">{moment(order.dateOrder).format('DD/MM/YYYY').toString()}</span>
									<span className="titleRow">{order.client.email}</span>
									<span className="titleRow">{`${this.getTotal(order)} €`}</span>
								</ExpansionPanelSummary>
								<ExpansionPanelDetails>
									<table>
										<tbody>
											{order.elements.map(element => 
												<tr key={`${order._id}/${element._id}`}>
													<td width="20%"></td>
													<td width="20%">
														<img className="articleRowImage" src={`${BASE_URL}/image/${element.article.image}`} alt={element.article.image} />
													</td>
													<td width="20%">{element.article.value}</td>
													<td width="20%">{element.quantity}</td>
													<td width="20%">{`${element.article.price} €`}</td>
												</tr>
											)}
										</tbody>
									</table>
								</ExpansionPanelDetails>
							</ExpansionPanel>
						) : null}
				</div>
			</div>
		);
	}
}

export default Orders;
