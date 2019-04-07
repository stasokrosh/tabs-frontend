import React, { Component } from 'react'
import './EditorComponent.css'
import Editor from '../editor';
import InstrumentPanelComponent from './InstrumentPanelComponent';

class EditorComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        };
        this.onClick = this.onClick.bind(this);
        this.onContextMenu = this.onContextMenu.bind(this);
        this.onResize = this.onResize.bind(this);
    }

    render() {
        if (!this.state.loading) {
            this.editor.prepare();
        }
        return (
            <div>
                <div className='Editor'>
                    <div className='InstrumentPanelContainer'><InstrumentPanelComponent /></div>
                    <div className='Workspace' id='Workspace' onClick={this.onClick} onContextMenu={this.onContextMenu}>
                        <div className='WorkspacePages' id='WorkspacePages'>
                        </div>
                    </div>
                </div>
                <div className='ControlPanel' id='ControlPanel'>ControlPanel</div>
            </div>
        )
    }

    onClick() {
        let editor = this.editor;
        editor.settings.zoom += 0.1;
        editor.prepare();
        editor.redraw();
    }

    onContextMenu(e) {
        let editor = this.editor;
        editor.settings.zoom -= 0.1;
        editor.prepare();
        editor.redraw();
        e.preventDefault();
    }

    onResize() {
        this.updateWorkspaceHeight();
        this.editor.prepare();
        this.editor.redraw();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.editor.redraw();
    }

    updateWorkspaceHeight() {
        let workspace = document.getElementById('Workspace');
        let controlPanel = document.getElementById('ControlPanel');
        let height = controlPanel.offsetTop - workspace.offsetTop;
        workspace.style.height = height + 'px';
    }

    componentDidMount() {
        this.updateWorkspaceHeight();
        window.onresize = this.onResize;
        let state = this.state;
        state.loading = false;
        this.editor = Editor.Create({
            composition: this.props.composition,
            containerID: "WorkspacePages",
            workspaceID: "Workspace",
        });
        this.setState(state);
    }
}

export default EditorComponent;