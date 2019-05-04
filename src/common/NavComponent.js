import React, { Component } from 'react'
import './NavComponent.css'

class NavComponent extends Component {
    render() {
        return (
        <nav className='NavBar' id='NavBar'>
            <button className='HomeButton' id='HomeButton'>Tabs</button>
            <button className='UserButton SignIn' id='SignInButton'>Sign in</button>
            <button className='UserButton SignIn' id='SignInButton'>Sign up</button>
        </nav>
        )
    }
}

export default NavComponent;