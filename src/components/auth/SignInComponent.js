import React, { Component } from 'react'
import './AuthComponent.css'
import { NavigateHome, APP_PAGES } from '../../util/navigation';
import NavComponent from '../common/NavComponent';
import { Link } from 'react-router-dom'
import FooterComponent from '../common/FooterComponent';

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
                <div className='PageContainer Auth'>
                    <NavComponent App={this.props.App} />
                    <div className='AuthForm'>
                        <h1>Sign in</h1>
                        <div>
                            <label>Name:</label>
                        </div>
                        <div>
                            <input type="text" name='name' className='AuthInput' value={this.state.name} onChange={this.handleInputChange} />
                        </div>
                        <div>
                            <label>Password:</label>
                        </div>
                        <div>
                            <input type="password" name='password' className='AuthInput' value={this.state.password} onChange={this.handleInputChange} />
                        </div>
                        <div className='RegisterLink'>
                            <span>Dont have an account? <Link to={APP_PAGES.SIGNUP}>Register now</Link></span>
                        </div>
                        {this.state.error &&
                            <div>
                                <span className='AuthError Error'>
                                    {this.state.error}
                                </span>
                            </div>}
                        <button className='AuthButton Submit'onClick={this.handleSubmit}>Sign in</button>
                    </div>
                    <FooterComponent />
                </div>
                
        )
    }
}

export default SignInComponent;