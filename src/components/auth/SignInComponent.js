import React, { Component } from 'react'
import './SignInComponent.css'
import { NavigateHome, APP_PAGES } from '../../util/navigation';
import NavComponent from '../common/NavComponent';
import {Link} from 'react-router-dom'

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
            error: null
        });
    }

    async handleSubmit(event) {
        let res = await this.props.App.auth.authorise(this.state.name, this.state.password);
        if (res.success) {
            NavigateHome(this.props.history);
        } else {
            this.setState({ error: res.message });
        }
    }

    render() {
        return (
            <div className='PageContainer'>
                <NavComponent App={this.props.App} />
                <div className='SignInForm'>
                    <h1>Sign in</h1>
                    <div>
                        <label>Name:</label>
                    </div>
                    <div>
                        <input type="text" name='name' className='SignInInput' value={this.state.name} onChange={this.handleInputChange} />
                    </div>
                    <div>
                        <label>Password:</label>
                    </div>
                    <div>
                        <input type="password" name='password' className='SignInInput' value={this.state.password} onChange={this.handleInputChange} />
                    </div>
                    <div>
                        <span>Dont have an account? <Link to={APP_PAGES.SIGNUP}>Register now</Link></span>
                    </div>
                    {this.state.error &&
                        <div>
                            <span className='SignInError'>
                                {this.state.error}
                            </span>
                        </div>}
                    <button onClick={this.handleSubmit}>Sign in</button>
                </div>
            </div>
        )
    }
}

export default SignInComponent;