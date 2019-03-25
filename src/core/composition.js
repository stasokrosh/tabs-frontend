import { assert } from './util'

class Composition {
    constructor(props) {
        assert(() => props);
        this.name = props.name;
        this._tracks = [];
        this._tacts = [];
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
        assert(() => index <= this.tactCount());
        return this._tacts[index];
    }

    getTrack(index) {
        assert(() => index <= this.trackCount());
        return this._tracks[index];
    }

    getTactNum(tact) {
        return this._tacts.indexOf(tact);
    }

    addTact(tact, position = -1) {

    }

    deleteTact(tact) {
        let index = this.getTactNum(tact);
        if (index !== -1)
            this._tacts.splice(index, 1);
    }

    addTrack(track) {

    }

    deleteTrack(track) {
        let index = this._tracks.indexOf(track);
        if (index !== -1)
            this._tracks.splice(index, 1);
    }
}

export default Composition;