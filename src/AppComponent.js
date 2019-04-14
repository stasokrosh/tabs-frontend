import React, { Component } from 'react'
import './AppComponent.css'
import NavBarComponent from './nav-bar/NavBarComponent'
import { Switch, Route } from 'react-router-dom'
import { createTestComposition } from './tab/model/create-test-composition'
import EditorComponent from './tab/editor/component/EditorComponent'
import HomeComponent from './home/HomeComponent';

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
        </Switch>
      </div>
    );
  }
}

export default AppComponent;
