import React, { Component } from 'react'
import './UserListComponent.css'
import PageContainerComponent from '../common/PageContainerComponent';
import UserListItemComponent from './UserListItemComponent';

class UserListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [
                { name: 'Test user', tabsCount: 2 }
            ]
        };
    }

    render() {
        return (
            <PageContainerComponent>
                <ul className='UserList'>
                    {this.state.users.map(user => <li><UserListItemComponent user={user} /></li>)}
                </ul>
            </PageContainerComponent>
        )
    }
}

export default UserListComponent;