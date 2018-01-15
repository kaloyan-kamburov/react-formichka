import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Field from './Field';

class App extends Component {
	state = {
		formSubmitted: false,
		fields: {
			name: '',
			email: ''
		},
		errors: {
		}
	}

	handleSubmit = (evt) => {
		evt.preventDefault();
		this.setState({
			formSubmitted: true
		});
	}

	isFormValid = () => {
		for (var err in this.state.errors) {
			if (err.length > 0) {
				return false;
			}
		}
		return true;
	}

	addError = (name, errText) => {
		if (errText.length > 0) {
			 
		}
	}

	onChange = (name, value, errorText) => {
		let fields = this.state.fields;
		let errors = this.state.errors;

		fields[name] = value;

		if (errorText.length > 0) {
			errors[name] = errorText;
		} else {
			errors = [];
		}

		this.setState({ fields, errors }, () => {
			console.log(this.state)
		})
		
	}

	render() {
		return (
			<div className="App">
				<form onSubmit={this.handleSubmit}>
					<Field
						name='name'
						value=''
						formSubmitted={this.state.formSubmitted}
						onChange={this.onChange}
						validate={(inputText, name) => {
							let errText = [];
							if (inputText.length < 5) {
								errText.push('Name must be at least 5 symbols long');
							}

							if (inputText.indexOf('$') > -1 || inputText.indexOf('+') > -1) {
								errText.push('Incorrect symbols');
							}

							return errText;

						}}
					/>
					<br />
					<Field
						name='email'
						value=''
						formSubmitted={this.state.formSubmitted}
						onChange={this.onChange}
						validate={(inputText, name) => {
							let errText = [];
							if (!/^\w+([.-]?\w+)*@\w+([\.-]?\w+)*(.\w{2,3})+$/.test(inputText)) {
								errText.push('Invalid Email');
							}
							return errText;

						}}
					/>
					<button type='submit'>Submit</button>
				</form>
			</div>
		);
	}
}

export default App;
