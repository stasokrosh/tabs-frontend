import { assert } from './util'
import Track from './track'
import Tact from './tact'

class Composition {
    constructor(props) {
        assert(() => props);
        this.name = props.name;
        this._tracks = [];
        this._tacts = [];
    }

    static Create(props) {
        return new Composition(props);
    }

    refreshTracks() {
        for (let track of this._tracks)
            track.refresh(this);
    }

    get tacts() {
        return [...this._tacts];
    }

    get tracks() {
        return [...this._tracks];
    }

    get tactCount() {
        return this._tacts.length;
    }

    get trackCount() {
        return this._tracks.count;
    }

    getTact(index) {
        assert(() => index >= 0 && index <= this.tactCount);
        return this._tacts[index];
    }

    getTrack(index) {
        assert(() => index >= 0 && index <= this.trackCount);
        return this._tracks[index];
    }

    getTactNum(tact) {
        return this._tacts.indexOf(tact);
    }

    addTact(tact, position = -1) {
        assert(() => position === -1 || position === 0 || (position >= 0 && position < this.tactCount));
        let newTact = Tact.Create(tact);
        if (position === -1)
            this._tacts.push(newTact);
        else
            this._tacts.splice(position, 0, newTact);
        this.refreshTracks();
    }

    deleteTact(tact) {
        let index = this.getTactNum(tact);
        if (index !== -1)
            this._tacts.splice(index, 1);
        this.refreshTracks();
    }

    addTrack(track) {
        track.composition = this;
        let newTrack = Track.Create(track);
        this.tracks.push(newTrack);
        track.refresh(this);
    }

    deleteTrack(track) {
        let index = this._tracks.indexOf(track);
        if (index !== -1)
            this._tracks.splice(index, 1);
    }
}

export default Composition;