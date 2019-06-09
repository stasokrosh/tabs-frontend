import React, { Component } from 'react'
import './SignUpComponent.css'
import { NavigateHome } from '../../util/navigation';
import NavComponent from '../common/NavComponent';
import FooterComponent from '../common/FooterComponent';

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
                    <h1>Sign up</h1>
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
                    {this.state.error &&
                        <div>
                            <span className='AuthError Error'>
                                {this.state.error}
                            </span>
                        </div>}
                    <button className='AuthButton Submit'onClick={this.handleSubmit}>Sign up</button>
                </div>
                <FooterComponent/>
            </div>
        )
    }
}

export default SignUpComponent;