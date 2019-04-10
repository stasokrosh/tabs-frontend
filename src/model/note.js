import { assert } from '../util'

export const DEFAULT_FRET_COUNTS = {
    GUITAR: 24,
    BASS: 24
}

export const DEFAULT_FRET_COUNT = DEFAULT_FRET_COUNTS.GUITAR;
export const DEFAULT_EXCEPTION_FRET = -1; 

export function validateFret(fret, maxFret) {
    assert(() => (fret >= 0 && fret <= maxFret) || fret === DEFAULT_EXCEPTION_FRET);
}

class Note {
    constructor(props) {
        assert(() => props);
        this.maxFret = props.maxFret || DEFAULT_FRET_COUNT;
        this.fret = props.fret;
    }

    static Create(props) {
        return new Note(props);
    }

    equal(note) {
        if (!note)
            return false;
        return this.fret === note.fret;
    }

    get fret() {
        return this._fret;
    }

    set fret(value) {
        validateFret(value, this._maxFret);
        this._fret = value;
    }

    get maxFret() {
        return this._maxFret;
    }

    set maxFret(value) {
        this._maxFret = value;
    } 

    get isEmpty() {
        return this._fret === DEFAULT_EXCEPTION_FRET;
    }
}

export default Note
