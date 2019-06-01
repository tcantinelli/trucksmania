import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { signinUser } from '../actions';
import { connect } from 'react-redux';

require('../style/login.css');

class Login extends Component  {
	constructor(props) {
		super(props);
		this.state = { 
			credentials: { email: '', password: '' }
		};
		this.onChange = this.onChange.bind(this);
		this.onSave = this.onSave.bind(this);
	}

	onChange(event) {
		const field = event.target.id;
		const credentials = this.state.credentials;
		credentials[field] = event.target.value;
		return this.setState({ credentials: credentials });
	}

	onSave(event) {
		event.preventDefault();
		this.props.signinUser(this.state.credentials, this.props.history);
	}
    
	render() {
		return (
			<div className="loginView valign-wrapper">
				<form className="container formContainer">
					<div className="row formRow">
						<div className="input-field col s12">
							<i className="material-icons prefix">account_circle</i>
							<input id="email" type="email" onChange={this.onChange} />
							<label htmlFor="email">Email</label>
						</div>
					</div>
					<div className="row formRow">
						<div className="input-field col s12">
							<i className="material-icons prefix">https</i>
							<input id="password" type="password" onChange={this.onChange} />
							<label htmlFor="password">Mot de passe</label>
						</div>
					</div>
					<div className="row formRow">
						<div className="input-field col s6 offset-s3 center-align">
							<button className="btn waves-effect" type="submit" name="action" onClick={this.onSave} >Connexion
								<i className="material-icons right">send</i>
							</button>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	...bindActionCreators(
		{signinUser}, dispatch)
});

export default connect(null, mapDispatchToProps)(Login);