import React, { Component } from 'react';
import { Field } from 'redux-form';
import M from 'materialize-css';
import { connect } from 'react-redux';

class Truck extends Component {
	componentWillMount() {
		document.addEventListener('DOMContentLoaded', function() {
			var elems = document.querySelectorAll('select');
			M.FormSelect.init(elems, {});
		});
	}
	
	renderInputComponent = field => {
		return (
			<div className="row">
				<div className="input-field col s4 offset-s1">
					<input {...field.input} type={field.type} id={field.label} className="form-control" />
					<label htmlFor={field.label}>{field.label}</label>
					{field.meta.touched && field.meta.error && <span className="error">{field.meta.error}</span>}
				</div>
			</div>
		);
	};

	render() {
		return (
			<div>
				<div>
					<Field
						name="name"
						component={this.renderInputComponent}
						type="text"
						label="Nom"
					/>
				</div>
				<div className="input-field col s4 offset-s1">
					<select className="icons">
						{this.props.categories.map(categorie => {
							return <option value="" data-icon={`../img/categories/${categorie.image}`} className="left" key={categorie._id}>{categorie.value}</option>;
						})}
					</select>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		categories: state.categories
	};
};

export default connect(
	mapStateToProps,
	null
)(Truck);