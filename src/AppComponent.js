import React, { Component } from 'react'
import './AppComponent.css'
import NavComponent from './common/NavComponent'
import { Switch, Route } from 'react-router-dom'
import EditorComponent from './edit/EditorComponent'
import HomeComponent from './home/HomeComponent';
import TabListComponent from './tab/TabListComponent';
import GroupComponent from './group/GroupComponent';
import AccountComponent from './user/UserComponent';
import SignUpComponent from './auth/SignUpComponent';
import SignInComponent from './auth/SignInComponent';
import TabComponent from './tab/TabComponent';
import GroupListComponent from './group/GroupListComponent';
import UserListComponent from './user/UserListComponent';

class AppComponent extends Component {
  render() {
    return (
      <div className='App'>
        <NavComponent />
        <Switch>
          <Route exact path='/' component={HomeComponent}></Route>
          <Route path='/editor/:id' component={EditorComponent}></Route>
          <Route exact path='/signup' component={SignUpComponent}></Route>
          <Route exact path='/signin' component={SignInComponent}></Route>
          <Route exact path='/tabs' component={TabListComponent}></Route>
          <Route path='/tabs/:id' component={TabComponent}></Route>
          <Route exact path='/groups' component={GroupListComponent}></Route>
          <Route path='/groups/:name' component={GroupComponent}></Route>
          <Route exact path='/users' component={UserListComponent}></Route>
          <Route path='/users/:name' component={AccountComponent}></Route>
        </Switch>
      </div>
    );
  }
}

export default AppComponent;
