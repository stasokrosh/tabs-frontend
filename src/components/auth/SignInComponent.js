import React, { Component } from 'react'
import './SignInComponent.css'
import { NavigateHome } from '../../util/navigation';

class SignInComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        this.setState({ 
            [event.target.name]: event.target.value,
            error : null 
        });
    }

    async handleSubmit(event) {
        let res = await this.props.App.auth.authorise(this.state.name, this.state.password);
        if (res.success) {
            this.props.App.needUpdate = true;
            NavigateHome(this.props.history);
        } else {
            this.setState({error : res.message});
        }
    }

    render() {
        return (
            <div className='SignInForm'>
                <label>Name:</label>
                <input type="text" name='name' className='SignInInput' value={this.state.name} onChange={this.handleInputChange} />
                <label>Password:</label>
                <input type="password" name='password' className='SignInInput' value={this.state.password} onChange={this.handleInputChange} />
                {this.state.error && <p className='SignInError'>{this.state.error}</p>}
                <button onClick={this.handleSubmit}>Sign in</button>
            </div>
        )
    }
}

export default SignInComponent;