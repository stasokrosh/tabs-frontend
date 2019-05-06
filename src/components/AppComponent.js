import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import './AppComponent.css'
import NavComponent from './common/NavComponent'
import EditorComponent from './edit/EditorComponent'
import HomeComponent from './home/HomeComponent';
import TabListComponent from './tab/TabListComponent';
import GroupComponent from './group/GroupComponent';
import UserComponent from './user/UserComponent';
import SignUpComponent from './auth/SignUpComponent';
import SignInComponent from './auth/SignInComponent';
import GroupListComponent from './group/GroupListComponent';
import UserListComponent from './user/UserListComponent';
import * as Navigation from '../util/Navigation'
import UserAuth from '../util/Auth';

class AppComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      App : {
        Auth : new UserAuth(),
        redraw : this.redraw.bind(this)
      }
    };
  }

  redraw() {
    this.forceUpdate();
  }

  render() {
    return (
      <div className='App'>
        <NavComponent />
        <Switch>
          <Route exact path = {Navigation.APP_PAGES.HOME} render = {(props) => <HomeComponent {...props} App = {this.state.App}/>}></Route>
          <Route exact path = {Navigation.APP_PAGES.SIGNUP} render = {(props) => <SignUpComponent {...props} App = {this.state.App}/>}></Route>
          <Route exact path = {Navigation.APP_PAGES.SIGIN} render = {(props) => <SignInComponent {...props} App = {this.state.App}/>}></Route>
          <Route exact path = {Navigation.APP_PAGES.TABS} render = {(props) => <TabListComponent {...props} App = {this.state.App}/>}></Route>
          <Route path = {Navigation.APP_PAGES.TABS_SINGLE} render = {(props) => <EditorComponent {...props} App = {this.state.App}/>}></Route>
          <Route exact path = {Navigation.APP_PAGES.GROUPS}  render = {(props) => <GroupListComponent {...props} App = {this.state.App}/>}></Route>
          <Route path = {Navigation.APP_PAGES.GROUPS_SINGLE}  render = {(props) => <GroupComponent {...props} App = {this.state.App}/>}></Route>
          <Route exact path = {Navigation.APP_PAGES.USERS}  render = {(props) => <UserListComponent {...props} App = {this.state.App}/>}></Route>
          <Route path = {Navigation.APP_PAGES.USER_SINGLE}  render = {(props) => <UserComponent {...props} App = {this.state.App}/>}></Route>
        </Switch>
      </div>
    );
  }
}

export default AppComponent;
