import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import * as Navigation from '../../util/navigation'
import SignInComponent from './SignInComponent'
import SignUpComponent from './SignUpComponent'

class AuthComponent extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path={Navigation.APP_PAGES.SIGNIN} render={(props) => <SignInComponent {...props} App={this.props.App} />}></Route>
                    <Route exact path={Navigation.APP_PAGES.SIGNUP} render={(props) => <SignUpComponent {...props} App={this.props.App} />}></Route>
                </Switch>
            </div>
        )
    };
}

export default AuthComponent;