import React, { Component } from 'react'
import './SignUpComponent.css'
import { NavigateHome } from '../../util/navigation';
import NavComponent from '../common/NavComponent';

class SignUpComponent extends Component {
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
            error: null
        });
    }

    async handleSubmit(event) {
        let res = await this.props.App.auth.register(this.state.name, this.state.password);
        if (res.success) {
            this.props.App.needUpdate = true;
            NavigateHome(this.props.history);
        } else {
            this.setState({ error: res.message });
        }
    }

    render() {
        return (
            <div className='PageContainer'>
                <NavComponent App={this.props.App} />
                <div className='SignUpForm'>
                    <h1>Sign up</h1>
                    <div>
                        <label>Name:</label>
                    </div>
                    <div>
                        <input type="text" name='name' className='SignUpInput' value={this.state.name} onChange={this.handleInputChange} />
                    </div>
                    <div>
                        <label>Password:</label>
                    </div>
                    <div>
                        <input type="password" name='password' className='SignUpInput' value={this.state.password} onChange={this.handleInputChange} />
                    </div>
                    {this.state.error &&
                        <div>
                            <span className='SignInError'>
                                {this.state.error}
                            </span>
                        </div>}
                    <button onClick={this.handleSubmit}>Sign up</button>
                </div>
            </div>
        )
    }
}

export default SignUpComponent;