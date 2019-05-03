import React, { Component } from 'react'
import './AppComponent.css'
import NavComponent from './common/NavComponent'
import { Switch, Route } from 'react-router-dom'
import { createTestComposition } from './edit/editor/model/create-test-composition'
import EditorComponent from './edit/EditorComponent'
import HomeComponent from './home/HomeComponent';
import TabComponent from './tab/TabComponent';
import GroupComponent from './group/GroupComponent';
import UserComponent from './user/UserComponent';
import AccountComponent from './account/AccountComponent';
import SignUpComponent from './auth/SignUpComponent';
import SignInComponent from './auth/SignInComponent';

class AppComponent extends Component {

  constructor(props) {
    super(props);
    this.composition = createTestComposition();
  }

  render() {
    return (
      <div className='App' id='App'>
        <NavComponent />
        <Switch>
          <Route exact path='/'><HomeComponent /></Route>
          <Route exact path='/editor'><EditorComponent composition={this.composition} /></Route>
          <Route path='/signup'><SignUpComponent/></Route>
          <Route path='/signin'><SignInComponent/></Route>
          <Route path='/tab'><TabComponent /></Route>
          <Route path='/group'><GroupComponent /></Route>
          <Route path='/user'><UserComponent /></Route>
          <Route path='/account'><AccountComponent /></Route>
        </Switch>
      </div>
    );
  }
}

export default AppComponent;
