import React, { Component } from 'react'
import './SignUpComponent.css'

class SignUpComponent extends Component {
    render() {
        return (
            <form className='SignUpForm'>
                <label>Nickname:</label>
                <input type="text" className='SignUpInput' />
                <label>Password:</label>
                <input type="password" className='SignUpInput' />
                <input type="button" value="Log in" />
            </form>
        )
    }
}

export default SignUpComponent;