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
import GroupListComponent from './group/GroupListComponent';
import UserListComponent from './user/UserListComponent';
import {createTestComposition} from './edit/editor/model/create-test-composition';

class AppComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {composition : createTestComposition()};
  }
  render() {
    return (
      <div className='App'>
        <NavComponent />
        <Switch>
          <Route exact path='/' component={HomeComponent}></Route>
          <Route path='/tab' render = {(props) => <EditorComponent composition = {this.state.composition}/>}></Route>
          <Route exact path='/signup' component={SignUpComponent}></Route>
          <Route exact path='/signin' component={SignInComponent}></Route>
          <Route exact path='/tabs' component={TabListComponent}></Route>
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
