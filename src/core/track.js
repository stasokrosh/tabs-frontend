import { assert } from './util'
import Instrument from './instrument'
import Composition from './composition'
import TrackTact from './track-tact'

class Track {
    constructor(props) {
        assert(() => props);
        this.name = props.name;
        this._instrument = Instrument.Create(props.instrument);
        this._tactsToTrackTacts = new Map();
        this.refresh(props.composition);
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
        this._tacts = [];
        let compositionTacts = composition.tacts;
        for (let tact of compositionTacts) {  
            let trackTact = this.getTrackTactByTact(tact);
            if (trackTact)
                this._tacts.push(trackTact);
            else
                this._tacts.push(TrackTact.Create({
                    tact : tact,
                    chordGenerator : this._instrument.getChordGenerator()
                }));
        }
        this.refreshTactsToTrackTacts();            
    }

    get tacts() {
        return [...this._tacts];
    }
}

export default Track;