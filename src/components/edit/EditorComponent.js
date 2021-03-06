import React, { Component } from 'react'
import './EditorComponent.css'
import Editor from './editor/editor';
import InstrumentPanelComponent from './components/InstrumentPanelComponent';
import ControlPanelComponent from './components/ControlPanelComponent';
import TrackPanelComponent from './components/TrackPanelComponent';
import WorkspaceComponent from './components/WorkspaceComponent';
import InfoPanelComponent from './components/InfoPanelComponent';
import NavComponent from '../common/NavComponent';
import ErrorComponent from '../common/ErrorComponent';
import CompositionProvider from './editor/provider/provider';
import LoadingComponent from '../common/LoadingComponent';
import Websocket from 'react-websocket';
import { getEditWsUrl } from './editor/util';

class EditorComponent extends Component {
    constructor(props) {
        super(props);
        this.onResize = this.onResize.bind(this);
        window.onresize = this.onResize;
        this.state = {
            loading: true,
            editor: Editor.Create({})
        };
        this.handleWsMessage = this.handleWsMessage.bind(this);
    }

    render() {
        if (!this.state.loading && !this.state.error)
            this.state.editor.prepare();
        return (
            <div className='PageContainer Editor'>
                <NavComponent App={this.props.App} history={this.props.history} />
                {
                    this.state.error
                        ? <ErrorComponent text={this.state.error} />
                        :
                        <div>
                            {this.state.editor.initialized &&
                                <div>
                                    <div className='InfoPanelContainer'>
                                        <InfoPanelComponent editor={this.state.editor} App={this.props.App} history={this.props.history} />
                                    </div>
                                    <div className='InstrumentPanelContainer'>
                                        <InstrumentPanelComponent editor={this.state.editor} App={this.props.App} />
                                    </div>
                                </div>
                            }
                            {this.state.loading && <LoadingComponent />}
                            <div className='WorkspaceContainer'>
                                {this.state.editor.initialized && <div className='TrackPanelContainer'>
                                    <TrackPanelComponent editor={this.state.editor} App={this.props.App} />
                                </div>
                                }
                                <WorkspaceComponent editor={this.state.editor} />
                            </div>
                            <div className='ControlPanelContainer' id='ControlPanelContainer'>
                                <ControlPanelComponent editor={this.state.editor} />
                            </div>
                            {!this.state.loading && this.state.editor.hasEditRights &&
                                <Websocket url={getEditWsUrl(this.state.editor.tab.id, this.props.App.auth.user.name)} onMessage={this.handleWsMessage}></Websocket>}
                        </div>
                }
            </div>
        )
    }

    onResize() {
        if (this.state.editor.initialized) {
            this.state.editor.prepare();
            this.state.editor.redraw();
        }
    }

    componentDidUpdate() {
        if (this.state.editor.initialized) {
            this.state.editor.redraw();
            this.updateWorkspaceHeight();
        }
    }

    updateWorkspaceHeight() {
        let workspace = document.getElementById('Workspace');
        let controlPanel = document.getElementById('ControlPanelContainer');
        let height = controlPanel.offsetTop - workspace.offsetTop;
        workspace.style.height = height + 'px';
    }

    handleWsMessage(message) {
        console.log(message);
    }

    async componentDidMount() {
        var context = new AudioContext();
        context.resume();
        let state = { loading: false };
        state.compositionProvider = CompositionProvider.Create({
            tabId: this.props.match.params.id,
            App: this.props.App,
            editor: this.state.editor
        });
        let initRes = await state.compositionProvider.init();

        if (initRes.success) {
            await this.state.editor.init({
                containerID: "WorkspacePages",
                workspaceID: "Workspace",
                compositionProvider: state.compositionProvider
            });
            this.updateWorkspaceHeight();
        } else {
            state.error = initRes.message;
        }
        this.setState(state);
    }
}

export default EditorComponent;