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

function TrackControlComponent(props) {
    return (
        <div>
            <div className='TrackControl'>
                <img className='TrackIcon' src={getImageSrcByInstrumentCode(props.track.instrument.code)} alt='' onClick={() => props.selectTrack(props.track)} />
                {props.expanded &&
                    <div className='TrackInfo'>
                        <input type='text' value={props.track.name} />
                        <button className='Cancel'>Delete</button>
                    </div>
                }
            </div>
        </div>
    );
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
        this.addTrackButtonClick = this.addTrackButtonClick.bind(this);
        this.cancelTrackCreate = this.cancelTrackCreate.bind(this);
        this.submitTrackCreate = this.submitTrackCreate.bind(this);
    }

    selectTrack(track) {

    }

    expand() {
        this.setState({ expanded: !this.state.expanded });
    }

    deleteTrack(track) {

    }

    changeTrackName(name) {

    }

    addTrackButtonClick() {
        this.setState({ creation: true });
    }

    cancelTrackCreate() {
        this.setState({ creation: false });
    }

    submitTrackCreate(track) {

    }

    render() {
        return (
            <div className='TrackPanel'>
                <ul className='TrackList'>
                    {
                        this.props.editor.composition.tracks.map(track =>
                            <li className='TrackControlContainer' key={this.props.editor.composition.tracks.indexOf(track)}>
                                <TrackControlComponent track={track} expanded={this.state.expanded} selectTrack={this.selectTrack} />
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