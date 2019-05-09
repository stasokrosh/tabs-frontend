import React, { Component } from 'react'
import './SignUpComponent.css'
import { NavigateHome } from '../../util/navigation';

class SignUpComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name : '',
            password : ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleInputChange(event) {
        this.setState({
            [event.target.name] : event.target.value,
            error : null
        });
    }

    async handleSubmit(event) {
        let res = await this.props.App.auth.register(this.state.name, this.state.password);
        if (res.success) {
            this.props.App.needUpdate = true;
            NavigateHome(this.props.history);
        } else {
            this.setState({error : res.message});
        }
    }

    render() {
        return (
            <div className='SignUpForm'>
                <label>Name:</label>
                <input type="text" name='name' className='SignUpInput' value={this.state.name} onChange={this.handleInputChange}/>
                <label>Password:</label>
                <input type="password" name='password' className='SignUpInput' value={this.state.password} onChange={this.handleInputChange}/>
                {this.state.error && <p className='SignUpError'>{this.state.error}</p>}
                <button onClick={this.handleSubmit}>Sign up</button>
            </div>
        )
    }
}

export default SignUpComponent;