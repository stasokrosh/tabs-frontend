import React, { Component } from 'react'
import './TrackPanelComponent.css'
import { INSTRUMENT_CODES } from '../editor/model/instrument';
import { getPublicImageUrl } from '../../../util';

function getImageSrcByInstrumentCode(code) {
    switch (code) {
        case INSTRUMENT_CODES.GUITAR:
            return getPublicImageUrl('instruments/guitar.png');
        case INSTRUMENT_CODES.BASS:
            return getPublicImageUrl('instruments/bass.png');
        case INSTRUMENT_CODES.KEYS:
            return getPublicImageUrl('instruments/keys.png');
        default:
            return;
    }
}

class TrackControlComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { name: props.track.name }
        this.selectTrack = this.selectTrack.bind(this);
        this.deleteTrack = this.deleteTrack.bind(this);
        this.changeTrackName = this.changeTrackName.bind(this);
        this.submitTrackName = this.submitTrackName.bind(this);
    }

    selectTrack() {
        this.props.selectTrack(this.props.track);
    }

    deleteTrack() {
        this.props.deleteTrack(this.props.track);
    }

    changeTrackName(e) {
        this.props.changeTrackName(this.props.track, e.target.value);
        this.forceUpdate();
    }

    submitTrackName() {
        if (!this.props.track.name) {
            this.props.changeTrackName(this.props.track, this.state.name);
            this.forceUpdate();
        } else {
            this.props.updateTrack({ id: this.props.track.id, name: this.props.track.name });
            this.setState({ name: this.props.track.name });
        }
    }

    render() {
        return (
            <div>
                <div className={'TrackControl' + (this.props.selected ? ' Selected' : '')} onClick={this.selectTrack}>
                    <img className='TrackIcon' src={getImageSrcByInstrumentCode(this.props.track.instrument.code)} alt=''/>
                    {this.props.expanded &&
                        <div className='TrackInfo'>
                            <input type='text' value={this.props.track.name} onChange={this.changeTrackName} onBlur={this.submitTrackName} 
                            onClick={(e)=>{e.stopPropagation();}}/>
                            <button className='Cancel' onClick={this.deleteTrack}>Delete</button>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

const DEFAULT_TRACK_NAME = 'New track';
const DEFAULT_TRACK_INSTRUMENT = INSTRUMENT_CODES.GUITAR;

class TrackAddComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            track: {
                name: DEFAULT_TRACK_NAME,
                instrument: DEFAULT_TRACK_INSTRUMENT
            }
        }
        this.changeName = this.changeName.bind(this);
        this.prevButton = this.prevButton.bind(this);
        this.nextButton = this.nextButton.bind(this);
    }

    changeName(e) {
        let state = this.state;
        state.track.name = e.target.value;
        this.setState(state);
    }

    prevButton() {
        let state = this.state;
        if (state.track.instrument > INSTRUMENT_CODES.GUITAR)
            state.track.instrument--;
        this.setState(state);
    }

    nextButton() {
        let state = this.state;
        if (state.track.instrument < INSTRUMENT_CODES.KEYS)
            state.track.instrument++;
        this.setState(state);
    }

    render() {
        return (
            <div className='TrackControl'>
                <input type='text' value={this.state.track.name} onChange={this.changeName} />
                <button className='TrackCreate Instrument' onClick={this.prevButton}>{"<"}</button>
                <img className='TrackIcon Create' src={getImageSrcByInstrumentCode(this.state.track.instrument)} alt='' />
                <button className='TrackCreate Instrument' onClick={this.nextButton}>{">"}</button>
                <button className='TrackCreate Cancel' onClick={this.props.cancelCreation}>Cancel</button>
                <button className='TrackCreate Submit' onClick={() => this.props.submitCreation(this.state.track)}>Submit</button>
            </div>
        )
    }
}

class TrackPanelComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            creation: false
        }
        this.selectTrack = this.selectTrack.bind(this);
        this.expand = this.expand.bind(this);
        this.deleteTrack = this.deleteTrack.bind(this);
        this.changeTrackName = this.changeTrackName.bind(this);
        this.updateTrack = this.updateTrack.bind(this);
        this.addTrackButtonClick = this.addTrackButtonClick.bind(this);
        this.cancelTrackCreate = this.cancelTrackCreate.bind(this);
        this.submitTrackCreate = this.submitTrackCreate.bind(this);
    }

    selectTrack(track) {
        this.props.editor.selectedTrack = track;
        this.props.editor.update(true);
        this.forceUpdate();
    }

    expand() {
        this.setState({ expanded: !this.state.expanded });
    }

    async deleteTrack(track) {
        if (track === this.props.editor.selectedTrack)
            this.props.editor.selectedTrack = this.props.editor.composition.tracks[0];
        await this.props.editor.provider.deleteTrackRequest(track);
        this.forceUpdate();
    }

    changeTrackName(track, name) {
        this.props.editor.changeTrackName(track, name);
        this.props.editor.redraw();
    }

    async updateTrack(track) {
        await this.props.editor.provider.updateTrackRequest(track);
    }

    addTrackButtonClick() {
        this.setState({ creation: true });
    }

    cancelTrackCreate() {
        this.setState({ creation: false });
    }

    async submitTrackCreate(track) {
        await this.props.editor.provider.addTrackRequest(track);
        this.setState({ creation: false });
    }

    render() {
        return (
            <div className='TrackPanel'>
                <ul className='TrackList'>
                    {
                        this.props.editor.composition.tracks.map(track =>
                            <li className='TrackControlContainer' key={this.props.editor.composition.tracks.indexOf(track)}>
                                <TrackControlComponent track={track} expanded={this.state.expanded} selected={this.props.editor.selectedTrack === track}
                                    selectTrack={this.selectTrack}
                                    deleteTrack={this.deleteTrack} 
                                    changeTrackName={this.changeTrackName}
                                    updateTrack={this.updateTrack}/>
                            </li>)
                    }
                    {this.state.creation ?
                        <li className='TrackControlContainer Create'>
                            <TrackAddComponent cancelCreation={this.cancelTrackCreate} submitCreation={this.submitTrackCreate} />
                        </li>
                        :
                        <li className='TrackControlContainer'>
                            <div className='TrackControl'>
                                <button className='TrackAddButton Submit' onClick={this.addTrackButtonClick}>Add</button>
                            </div>
                        </li>
                    }
                </ul>
                <button className='ExpandButton' onClick={this.expand}>{this.state.expanded ? '<' : '>'}</button>
            </div>
        )
    }
}

export default TrackPanelComponent;