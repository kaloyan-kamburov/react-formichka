import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Field extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
    }

    state = {
        value: this.props.value,
        errorTextValues: []
    }

    onChange = (evt) => {
        evt.persist();

        // if (this.props.formSubmitted) {
        //     this.setState({
                
        //     })
        // }
        
        this.setState({
            value: evt.target.value,
            errorTextValues: this.props.validate(evt.target.value)
        }, () => {
            // console.log(this.state.errorTextValues)
            
            this.props.onChange(this.props.name, this.state.value, this.state.errorTextValues)
        });
    }

    renderError = () => {
        if (this.props.formSubmitted) {
            if (!this.state.errorTextValues.length > 0) {
                return;
            } else {
                return (
                    this.state.errorTextValues.map((text, i) => {
                        return(
                            <span className='error-text' key={i}>{text}</span>
                        )
                    })
                    
                );
            }
        }

        return;
    }

    render() {
        return (
            <div className='field-wrapper'>
                <input type='text'
                    name={this.props.name}
                    value={this.state.value}
                    onChange={this.onChange}
                /><br />
                {this.renderError()}
            </div>
        )
    }
}

export default Field;