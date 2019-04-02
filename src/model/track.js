import { assert } from '../util'
import Instrument from './instrument'
import Composition from './composition'
import TrackTact from './track-tact'

class Track {
    constructor(props) {
        assert(() => props);
        this.name = props.name;
        this._instrument = Instrument.Create(props.instrument);
        this._tactsToTrackTacts = new Map();
        this._tacts = [];
        this.refresh(props.composition);
    }

    static Create(props) {
        return new Track(props);
    }

    getTrackTactByTact(tact) {
        return this._tactsToTrackTacts.get(tact);
    }

    refreshTactsToTrackTacts() {
        this._tactsToTrackTacts.clear();
        for (let trackTact of this._tacts) {
            this._tactsToTrackTacts.set(trackTact.tact, trackTact);
        }
    }

    refresh(composition) {
        assert(() => composition instanceof Composition);
        this._tacts.length = 0;
        let compositionTacts = composition.tacts;
        for (let tact of compositionTacts) {
            let trackTact = this.getTrackTactByTact(tact);
            if (trackTact)
                this._tacts.push(trackTact);
            else
                this._tacts.push(TrackTact.Create({
                    tact: tact,
                    chordGenerator: this._instrument.getChordGenerator()
                }));
        }
        this.refreshTactsToTrackTacts();
    }

    get tactCount() {
        return this._tacts.length;
    }

    get tacts() {
        return [...this._tacts];
    }

    getTact(index) {
        assert(() => index >= 0 && index < this.tactCount);
        return this._tacts[index];
    }

    getTactNum(tact) {
        assert(() => tact instanceof TrackTact);
        return this._tacts.indexOf(tact);
    }

    get instrument() {
        return this._instrument;
    }
}

export default Track;