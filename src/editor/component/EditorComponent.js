import React, { Component } from 'react'
import './EditorComponent.css'
import Editor from '../editor';

class EditorComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            settings : {}
        };
    }

    render() {
        return (
            <div className='EditorFrame' id='EditorFrame' onClick={this.onClick}>
                <div className={this.state.settings.isVertical ? 'EditorContainer vertical' : 'EditorContainer horizontal'} id='EditorContainer'>
                </div>
            </div>
        )

    }

    onClick() {
        //test stuff
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.state.editor.redraw();
    }

    componentDidMount() {
        let state = this.state;
        state.loading = false;
        state.editor = Editor.Create({
            composition: this.props.composition,
            containerID: "EditorContainer",
            settings: this.state.settings
        })
        this.setState(state);
    }
}

export default EditorComponent;