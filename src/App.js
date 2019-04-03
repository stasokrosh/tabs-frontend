import React, { Component } from 'react';
import './App.css';
import { createTestComposition } from './model/create-test-composition';
import DrawContext from './view/draw-context'
import TrackView from './view/track-view'

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
    let composition = createTestComposition();
    let drawContext = DrawContext.CreateSvgDrawContext({
      containerID : 'App'
    });
    let trackView = TrackView.Create({
      drawContext : drawContext,
      track : composition.getTrack(0),
      settings : {
        isVertical : false
      }
    });
    trackView.calculateStructure();
    drawContext.renderTrack(trackView);
    this.setState({trackView, drawContext});
  }

  onClick() {
    let state = this.state;
    state.trackView.calculateStructure();
    state.drawContext.renderer.renderTrack(state.trackView);
  }
}

export default App;
