import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import * as Navigation from '../../util/navigation'
import UserInfoComponent from './UserInfoComponent'
import UserListComponent from './UserListComponent'

class UserComponent extends Component {
    constructor(props) {
        super(props);
        props.App.update();
    }
    
    render() {
        return (
            <div>
                <Switch>
                    <Route path={Navigation.APP_PAGES.USERS_SINGLE} render={(props) => <UserInfoComponent {...props} App={this.props.App} />}></Route>
                    <Route exact path={Navigation.APP_PAGES.USERS} render={(props) => <UserListComponent {...props} App={this.props.App} />}></Route>
                </Switch>
            </div>
        )
    }
}

export default UserComponent;