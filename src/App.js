import React, { Component } from 'react';
import './App.css';
import SVG from 'svg.js'

class App extends Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  render() {
    return (
      <div className="App" id="App" onClick={this.onClick}>
      </div>
    );
  }

  componentDidMount() {
    var draw = SVG('App').size(300, 300)
    let nested = draw.nested();
    nested.size(150, 150);
    nested.rect(100, 100).attr({ fill: '#f06' });
    this.setState({ nested, draw })
  }

  onClick() {
    this.state.draw.viewbox(20,20)
  }
}

export default App;
