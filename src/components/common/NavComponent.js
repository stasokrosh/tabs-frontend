import React, { Component } from 'react'
import './NavComponent.css'
import { Link } from 'react-router-dom'
import { APP_PAGES, getSingleUserPath } from '../../util/navigation'

class NavComponent extends Component {
    render() {
        return (
            <nav className='NavBar'>
                <Link className='HomeButton' to={APP_PAGES.HOME}>Home</Link>
                <Link className='TabsButton' to={APP_PAGES.TABS}>Tabs</Link>
                <Link className='GroupsButton' to={APP_PAGES.GROUPS}>Groups</Link>
                <Link className='UsersButton' to={APP_PAGES.USERS}>Users</Link>
                {this.props.App.auth.isAuthorised ? (
                    <div className='UserPanel'>
                        <Link className='UserButton' to={getSingleUserPath(this.props.App.auth.user.name)}>{this.props.App.auth.user.name}</Link>
                    </div>
                ) : (
                    <div className='UserPanel'>
                        <Link className='SignInButton' to={APP_PAGES.SIGNIN}>Sign in</Link>
                        <Link className='SignUpButton' to={APP_PAGES.SIGNUP}>Sign up</Link>
                    </div>
                )}
            </nav>
        )
    }
}

export default NavComponent;