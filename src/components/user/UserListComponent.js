import React, { Component } from 'react'
import './UserListComponent.css'
import UserListItemComponent from './UserListItemComponent';
import { getUsersRequest } from '../../api/user-api';
import LoadingComponent from '../common/LoadingComponent';
import ErrorComponent from '../common/ErrorComponent';

class UserListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading : true,
            users: []
        };
    }

    async componentDidMount() {
        let state = { loading: false };
        let res = await getUsersRequest(this.props.App.auth.token);
        if (res.success) {
            state.users = res.body;
        } else {
            state.error = res.message;
        }
        this.setState(state);
    }

    render() {
        if (this.state.loading)
            return <LoadingComponent />
        else if (this.state.error)
            return <ErrorComponent text={this.state.error} />
        else 
        return (
            <div className='PageContainer'>
                <ul className='UserList'>
                    {this.state.users.map(user => 
                    <li key={user.name}><UserListItemComponent user={user} /></li>)}
                </ul>
            </div>
        )
    }
}

export default UserListComponent;