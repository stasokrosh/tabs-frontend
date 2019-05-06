import React, { Component } from 'react'
import './SignInComponent.css'

class SignInComponent extends Component {
    render() {
        return (
            <form className='SignInForm'>
                <label>Nickname:</label>
                <input type="text" className='SignInInput'/>
                <label>Password:</label>
                <input type="password" className='SignInInput'/>
                <input type="button" value="Log in" />
            </form>
        )
    }
}

export default SignInComponent;