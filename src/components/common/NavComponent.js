import React, { Component } from 'react'
import './NavComponent.css'
import { Link } from 'react-router-dom'
import { APP_PAGES, getSingleUserPath } from '../../util/navigation'

class NavComponent extends Component {
    render() {
        return (
            <div className='NavBar'>
                <Link className='NavButton' to={APP_PAGES.HOME}>Home</Link>
                <Link className='NavButton' to={APP_PAGES.TABS}>Tabs</Link>
                <Link className='NavButton' to={APP_PAGES.GROUPS}>Groups</Link>
                <Link className='NavButton' to={APP_PAGES.USERS}>Users</Link>
                <div className='AuthPanel'>
                    {this.props.App.auth.isAuthorised ? (
                        <Link className='NavButton' to={getSingleUserPath(this.props.App.auth.user.name)}>{this.props.App.auth.user.name}</Link>
                    ) : (
                            <Link className='NavButton' to={APP_PAGES.SIGNIN}>Sign in</Link>
                        )}
                </div>
            </div>
        )
    }
}

export default NavComponent;