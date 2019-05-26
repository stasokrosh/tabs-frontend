import React, { Component } from 'react'
import './NavComponent.css'
import { Link } from 'react-router-dom'
import { APP_PAGES, NavigateHome, NavigateUser } from '../../util/navigation'
import ImageComponent from './ImageComponent';

class AuthUserButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        }
        this.expand = this.expand.bind(this);
    }

    expand(e) {
        e.preventDefault();
        this.setState({expanded : !this.state.expanded});
    }

    render() {
        return (
            <div className='UserButtonPanel'>
                <ImageComponent id={this.props.image} />
                <div>
                    <button className='UserButton' onClick={this.expand}>{this.props.name}</button>
                    <div className={"UserButtonDropdown" + (this.state.expanded ? ' Active' : '')}>
                        <button onClick={this.props.account}>Account</button>
                        <button onClick={this.props.logout}>Log out</button>
                    </div></div>
            </div>
        )
    }
}


class NavComponent extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.account = this.account.bind(this);
    }

    logout() {
        this.props.App.auth.logout();
        NavigateHome(this.props.history);
    }

    account() {
        NavigateUser(this.props.history, this.props.App.auth.user.name);
    }

    render() {
        return (
            <div className='NavBar'>
                <Link className='NavButton' to={APP_PAGES.TABS}>Tabs</Link>
                <Link className='NavButton' to={APP_PAGES.GROUPS}>Groups</Link>
                <Link className='NavButton' to={APP_PAGES.USERS}>Users</Link>
                <div className='AuthPanel'>
                    {this.props.App.auth.isAuthorised ? (
                        <AuthUserButton image={this.props.App.auth.user.image} name={this.props.App.auth.user.name} logout={this.logout} account={this.account}/>
                    ) : (
                            <Link className='NavButton' to={APP_PAGES.SIGNIN}>Sign in</Link>
                        )}
                </div>
            </div>
        )
    }
}

export default NavComponent;