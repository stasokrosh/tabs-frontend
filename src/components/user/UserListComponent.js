import React, { Component } from 'react'
import './UserListComponent.css'
import UserListItemComponent from './UserListItemComponent';
import { getUsersRequest } from '../../api/user-api';
import LoadingComponent from '../common/LoadingComponent';
import ErrorComponent from '../common/ErrorComponent';
import NavComponent from '../common/NavComponent';
import FooterComponent from '../common/FooterComponent';

class UserListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
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
        return (
            <div className='PageContainer'>
                <NavComponent App={this.props.App} history={this.props.history}/>
                {
                    this.state.loading ?
                        <LoadingComponent /> :
                        this.state.error ?
                            <ErrorComponent text={this.state.error} />
                            :
                            <div>
                                <h1 className='ListTitle'>Users:</h1>
                                <div className='ItemListContainer'>
                                    <ul className='ItemList'>
                                        {this.state.users.map(user =>
                                            <li key={user.name} className='ListItemContainer'>
                                                <UserListItemComponent user={user} />
                                                <hr className='ListSeparator' />
                                            </li>)}
                                    </ul>
                                </div>
                            </div>}
                <FooterComponent/>
            </div>
        )
    }
}

export default UserListComponent;