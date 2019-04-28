import React, { Component } from 'react'
import './AppComponent.css'
import NavBarComponent from './nav/NavBarComponent'
import { Switch, Route } from 'react-router-dom'
import { createTestComposition } from './edit/editor/model/create-test-composition'
import EditorComponent from './edit/EditorComponent'
import HomeComponent from './home/HomeComponent';
import SignInComponent from './auth/SignInComponent';
import SignUpComponent from './auth/SignUpComponent';

class AppComponent extends Component {

  constructor(props) {
    super(props);
    this.composition = createTestComposition();
  }

  render() {
    return (
      <div className='App' id='App'>
        <NavBarComponent />
        <Switch>
          <Route exact path='/'><HomeComponent /></Route>
          <Route exact path='/editor'><EditorComponent composition={this.composition} /></Route>
          <Route exact path='/signin'><SignInComponent /></Route>
          <Route exact path='/signup'><SignUpComponent /></Route>
        </Switch>
      </div>
    );
  }
}

export default AppComponent;
