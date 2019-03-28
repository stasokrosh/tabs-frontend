import { assert } from '../util'
import Tact from './tact'
import Chord from './chord'

class TrackTact {
    constructor(props) {
        assert(() => props);
        assert(() => props.tact instanceof Tact);
        this._tact = props.tact;
        if (!props.chords)
            this._chords = [];
        else
            this.chords = props.chords;
        assert(() => props.chordGenerator);
        this._chordGenerator = props.chordGenerator;
    }

    static Create(trackTact) {
        return new TrackTact(trackTact);
    }

    get chordCount() {
        return this._chords.length;
    }

    get tact() {
        return this._tact;
    }

    get chords() {
        return [...this._chords];
    }

    set chords(value) {
        this._chords.length = 0;
        for (let chord of value) {
            this._chords.push(Chord.Create(chord));
        }
    }

    getChordNum(chord) {
        return this._chords.indexOf(chord);
    }

    deleteChord(chord) {
        let index = this.getChordNum(chord);
        if (index !== -1)
            this._chords.splice(index, 1);
    }

    getChord(index) {
        assert(() => index >= 0 && index < this.chordCount);
        return this._chords[index];
    }

    addChord(chord, position = -1) {
        assert(() => position === -1 || position === 0 || (position >= 0 && position < this.chordCount));
        let newChord = this._chordGenerator(chord);
        if (position === -1)
            this._chords.push(newChord);
        else
            this._chords.splice(position, 0, newChord);
    }

    get chordGenerator() {
        return this._chordGenerator;
    }
}

export default TrackTact;