import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import './AppComponent.css'
import HomeComponent from './home/HomeComponent'
import AuthComponent from './auth'
import TabComponent from './tab'
import GroupComponent from './group'
import UserComponent from './user'
import * as Navigation from '../util/navigation'
import UserAuth from '../util/UserAuth'
import NavComponent from './common/NavComponent';

class AppComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      App: {
        auth: new UserAuth(),
        needUpdate: true,
        update: this.update.bind(this)
      }
    };
  }

  update(forced) {
    let state = this.state;
    if (state.App.needUpdate || forced) {
      state.App.needUpdate = false;
      this.setState(state);
    }
  }

  render() {
    return (
      <div className='App'>
        <NavComponent App={this.state.App} />
        <Switch>
          <Route exact path={Navigation.APP_PAGES.HOME} render={(props) => <HomeComponent {...props} App={this.state.App} />}></Route>
          <Route path={Navigation.APP_PAGES.AUTH} render={(props) => <AuthComponent {...props} App={this.state.App} />}></Route>
          <Route path={Navigation.APP_PAGES.TABS} render={(props) => <TabComponent {...props} App={this.state.App} />}></Route>
          <Route path={Navigation.APP_PAGES.GROUPS} render={(props) => <GroupComponent {...props} App={this.state.App} />}></Route>
          <Route path={Navigation.APP_PAGES.USERS} render={(props) => <UserComponent {...props} App={this.state.App} />}></Route>
        </Switch>
      </div>
    );
  }
}

export default AppComponent;
