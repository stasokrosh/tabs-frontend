import React, { Component } from 'react'
import './NavComponent.css'

class NavComponent extends Component {
    render() {
        return (
            <nav className='NavBar'>
                <button className='HomeButton'>Home</button>
                <button className='TabsButton'>Tabs</button>
                <button className='GroupsButton'>Groups</button>
                <button className='UsersButton'>Users</button>
                <div className='UserPanel'>
                    <button className='SignIn'>Sign in</button>
                    <button className='SignUp'>Sign up</button>
                </div>
            </nav>
        )
    }
}

export default NavComponent;