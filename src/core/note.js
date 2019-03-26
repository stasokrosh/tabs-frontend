import { assert } from './util'
import Duration  from './duration'

export const DEFAULT_FRET_COUNTS = {
    GUITAR: 20,
    BASS: 20
}

export const DEFAULT_FRET_COUNT = DEFAULT_FRET_COUNTS.GUITAR;

export function validateFret(fret, maxFret) {
    assert(() => fret >= 0 && fret <= maxFret);
}

class Note {
    constructor(props) {
        assert(() => props);
        this.maxFret = props.maxFret || DEFAULT_FRET_COUNT;
        this.duration = props.duration;
        this.fret = props.fret;
    }

    static Create(props) {
        return new Note(props);
    }

    equal(note) {
        if (!note)
            return false;
        return this.fret === note.fret &&
            this.duration.equal(note.duration);
    }

    get fret() {
        return this._fret;
    }

    set fret(value) {
        validateFret(value, this._maxFret);
        this._fret = value;
    }

    get duration() {
        return this._duration;
    }

    set duration(value) {
        this._duration = Duration.Create(value);
    }

    get maxFret() {
        return this._maxFret;
    }

    set maxFret(value) {
        this._maxFret = value;
    } 
}

export default Note
