import { assert } from './util'
import Note, { DEFAULT_FRET_COUNTS } from './note'

export const DEFAULT_STRING_COUNTS = {
    GUITAR: 6,
    BASS: 4
}

export function validateString(index, maxStringCount) {
    assert( () => index >= 0 && index < maxStringCount );
}

class Chord {
    constructor(props) {
        assert(() => props);
        assert(() => props.stringNum);
        this._stringNum = props.stringNum;
        assert(() => props.fretNum);
        this._fretNum = props.fretNum;
        this._notes = new Array(props.stringNum);
        if (props.notes)
            this.notes = props.notes;
    }

    static CreateChord(props) {
        return new Chord(props);
    }

    static CreateGuitarChord(props) {
        props.stringNum = DEFAULT_STRING_COUNTS.GUITAR;
        props.fretNum = DEFAULT_FRET_COUNTS.GUITAR;
        return Chord.CreateChord(props);
    }

    static CreateBassChord(props) {
        props.stringNum = DEFAULT_STRING_COUNTS.BASS;
        props.fretNum = DEFAULT_FRET_COUNTS.BASS;
        return Chord.CreateChord(props);
    }

    get notes() {
        let notes = [];
        this._notes.forEach((item, index, arr) => {
            if (item)
                notes.push({ item, index });
        })
        return notes;
    }

    set notes(value) {
        assert(() => value);
        this._notes.length = 0;
        for (let note of value)
            this.setNote(note.index, note.item);
    }

    getNote(index) {
        validateString(index, this._stringNum);
        return this._notes[index];
    }

    setNote(index, item) {
        validateString(index, this._stringNum);
        if (!item) {
            this._notes[index] = item;
        } else {
            item.maxFret = this._fretNum;
            this._notes[index] = Note.Create(item);
        }
    }
}

export default Chord;