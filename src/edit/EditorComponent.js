import React, { Component } from 'react'
import './EditorComponent.css'
import Editor from './editor/editor';
import InstrumentPanelComponent from './instrument-panel/InstrumentPanelComponent';
import ControlPanelComponent from './control-panel/ControlPanelComponent';
import TrackPanelComponent from './track-panel/TrackPanelComponent';
import WorkspaceComponent from './workspace/WorkspaceComponent';

class EditorComponent extends Component {
    constructor(props) {
        super(props);
        this.editor = Editor.Create({
            composition: this.props.composition
        });
        this.onResize = this.onResize.bind(this);
        window.onresize = this.onResize;
        this.state = {
            loading : true
        };
    }

    render() {
        if (!this.state.loading)
            this.editor.prepare();
        return (
            <div className='Editor'>
                <div className='InstrumentPanelContainer' id='InstrumentPanelContainer'>
                    <InstrumentPanelComponent editor = {this.editor}/>
                </div>
                <div className='WorkspaceContainer'>
                    <div className='TrackPanelContainer' id='TrackPanelContainer'>
                        <TrackPanelComponent/>
                    </div>
                    <WorkspaceComponent editor={this.editor}/>
                </div>
                <div className='ControlPanelContainer' id='ControlPanelContainer'>
                    <ControlPanelComponent/>
                </div>
            </div>
        )
    }

    onResize() {
        this.updateWorkspaceHeight();
        this.editor.prepare();
        this.editor.redraw();
    }

    componentDidUpdate() {
        this.editor.redraw();
    }

    updateWorkspaceHeight() {
        let workspace = document.getElementById('Workspace');
        let controlPanel = document.getElementById('ControlPanelContainer');
        let height = controlPanel.offsetTop - workspace.offsetTop - 8;
        workspace.style.height = height + 'px';
    }

    componentDidMount() {
        this.editor.init({
            containerID: "WorkspacePages",
            workspaceID: "Workspace"
        });
        this.updateWorkspaceHeight();
        let state = this.state;
        state.loading = false;
        this.setState(state);
    }
}

export default EditorComponent;