import React, { Component } from 'react';
import './App.css';
import EditorComponent from './editor/component/EditorComponent'
import { createTestComposition } from './model/create-test-composition';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {composition : createTestComposition()};
  }

  render() {
    return (
      <EditorComponent id = 'Editor' composition={this.state.composition}/>
    );
  }
}

export default App;
