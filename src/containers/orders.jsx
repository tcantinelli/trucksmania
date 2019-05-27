import React, { Component } from 'react';
import {} from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PartTitle from '../components/part_title';

class Orders extends Component {

	render() {
		// console.log(this.props.orders);
		return (
			<div className="container-fluid adminContainer">
				<div className="partContainer" >
					<PartTitle title="En cours" />
					<br />
					{/* <table className="responsive-table">
						<tbody>
							{this.props.orders ? this.props.orders.map(order => 
								<tr key={order._id}>
									<td width="20%" className="centered">{article.value}</td>
									<td width="10%" className="centered">{`${article.price} €`}</td>
									<td width="50%" className="centered">{article.description}</td>
									<td width="10%" className="row centered">
										<div className="col articleLoadIcon center-align valign-wrapper"
											onClick={this.loadArticle.bind(this, article)}
											role="presentation"
										>
											<i className="material-icons boxUpdateText">edit</i>
										</div>
										<div className="col articleDeleteIcon center-align valign-wrapper"
											onClick={this.deleteArticle.bind(this, article._id)}
											role="presentation"
										>
											<i className="material-icons boxDeleteText">delete_forever</i>
										</div>
									</td>
								</tr>
								<tr key={order._id}>
									<td width="10%">
										{article.image 
											? <img className="articleRowImage" src={`${BASE_URL}/image/${article.image._id}`} alt={article.image.name} />
											: <img className="articleRowImage" src="../img/article_default.png" alt="Default logo" />}
									</td>
									<td width="20%" className="centered">{article.value}</td>
									<td width="10%" className="centered">{`${article.price} €`}</td>
									<td width="50%" className="centered">{article.description}</td>
									<td width="10%" className="row centered">
										<div className="col articleLoadIcon center-align valign-wrapper"
											onClick={this.loadArticle.bind(this, article)}
											role="presentation"
										>
											<i className="material-icons boxUpdateText">edit</i>
										</div>
										<div className="col articleDeleteIcon center-align valign-wrapper"
											onClick={this.deleteArticle.bind(this, article._id)}
											role="presentation"
										>
											<i className="material-icons boxDeleteText">delete_forever</i>
										</div>
									</td>
								</tr>
							) : null}
						</tbody>
					</table> */}
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	...bindActionCreators(
		{},
		dispatch
	)
});
export default connect(
	null,
	mapDispatchToProps
)(Orders);
