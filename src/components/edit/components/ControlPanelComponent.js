import React, { Component } from 'react'
import './ControlPanelComponent.css'
import { getPublicImageUrl } from '../../../util';
import { EditorEvent } from '../editor/editor-event';


class ControlPanelComponent extends Component {
    constructor(props) {
        super(props);
        this.play = this.play.bind(this);
        props.editor.addEventListener(this);
        this.selectNextTrack = this.selectNextTrack.bind(this);
        this.selectPrevTrack = this.selectPrevTrack.bind(this);
        this.changeVolume = this.changeVolume.bind(this);
    }

    play() {
        let editor = this.props.editor;
        if (editor.isPlaying)
            editor.drawContext.invokeEvent(EditorEvent.CreateStopEvent({}));
        else
            editor.drawContext.invokeEvent(EditorEvent.CreatePlayEvent({}));
    }

    selectNextTrack() {
        let editor = this.props.editor;
        let index = editor.composition.getTrackNum(editor.selectedTrack);
        if (index !== editor.composition.trackCount - 1) {
            editor.drawContext.invokeEvent(EditorEvent.CreateSelectTrackEvent({
                object: {
                    track: editor.composition.getTrack(index + 1)
                }
            }))
        }
    }

    selectPrevTrack() {
        let editor = this.props.editor;
        let index = editor.composition.getTrackNum(editor.selectedTrack);
        if (index !== 0) {
            editor.drawContext.invokeEvent(EditorEvent.CreateSelectTrackEvent({
                object: {
                    track: editor.composition.getTrack(index - 1)
                }
            }))
        }
    }

    changeVolume(e) {
        this.props.editor.volume = e.target.value;
        this.forceUpdate();
    }

    render() {
        let editor = this.props.editor;
        return (
            <div className='ControlPanel'>
                <div className='ControlPanelInner'>
                    <button onClick={this.selectPrevTrack}>
                        <img className='ControlButtonImage Track' src={getPublicImageUrl('prev.png')} alt='' />
                    </button>
                    <button onClick={this.play}>
                        <img className='ControlButtonImage' src={getPublicImageUrl(editor.isPlaying ? 'stop.png' : 'play.png')} alt='' />
                    </button>
                    <button onClick={this.selectNextTrack}>
                        <img className='ControlButtonImage Track' src={getPublicImageUrl('next.png')} alt='' />
                    </button>
                </div>
                <input className='ControlVolume' type="range" id="start" min="0" max="1000" value={this.props.editor.volume}
                onChange={this.changeVolume}></input>
            </div>
        )
    }

    invokeEvent(event) {
        this.forceUpdate();
    }
}

export default ControlPanelComponent;