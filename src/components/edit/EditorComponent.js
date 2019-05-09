import React, { Component } from 'react'
import './EditorComponent.css'
import Editor from './editor/editor';
import InstrumentPanelComponent from './components/InstrumentPanelComponent';
import ControlPanelComponent from './components/ControlPanelComponent';
import TrackPanelComponent from './components/TrackPanelComponent';
import WorkspaceComponent from './components/WorkspaceComponent';
import InfoPanelComponent from './components/InfoPanelComponent';

class EditorComponent extends Component {
    constructor(props) {
        super(props);
        this.editor = Editor.Create({
            composition: this.props.composition
        });
        this.onResize = this.onResize.bind(this);
        window.onresize = this.onResize;
        this.state = {
            loading: true
        };
    }

    render() {
        if (!this.state.loading)
            this.editor.prepare();
        return (
            <div className='Editor'>
                <div className='InfoPanelContainer'>
                    <InfoPanelComponent />
                </div>
                <div className='InstrumentPanelContainer'>
                    <InstrumentPanelComponent editor={this.editor} />
                </div>
                <div className='WorkspaceContainer'>
                    <div className='TrackPanelContainer'>
                        <TrackPanelComponent />
                    </div>
                    <WorkspaceComponent editor={this.editor} />
                </div>
                <div className='ControlPanelContainer' id='ControlPanelContainer'>
                    <ControlPanelComponent />
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