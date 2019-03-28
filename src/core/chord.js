import { assert } from '../util'
import Note, { DEFAULT_FRET_COUNTS } from './note'
import Duration from './duration';

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
        this.stringNum = props.stringNum;
        assert(() => props.fretNum);
        this.fretNum = props.fretNum;
        this._notes = new Array(props.stringNum);
        if (props.notes)
            this.notes = props.notes;
        this.duration = props.duration;
        this.isPause = props.isPause;
    }

    static CreateChord(props) {
        return new Chord(props);
    }

    equal(chord) {
        if (!chord)
            return false;
        if (this.stringNum === chord.stringNum && this.fretNum === chord.fretNum) {
            let equal = true;
            for (let index = 0; index < this.stringNum && equal; index++) { 
                let ownNote = this.getNote(index);
                let chordNote = chord.getNote(index);
                
                if (!ownNote && !chordNote)
                    continue;

                if (ownNote && chordNote) 
                    equal = ownNote.equal(chordNote);
                else 
                    equal = false;
            }
            return equal;
        } else {
            return false;
        }
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
            this.isPause = false;
        }
    }

    get stringNum() {
        return this._stringNum;
    }

    set stringNum(value) {
        this._stringNum = value;
    }

    get fretNum() {
        return this._fretNum;
    }

    set fretNum(value) {
        this._fretNum = value;
    }

    get isEmpty() {
        let isEmpty = true;
        for (let index = 0; index < this.stringNum && isEmpty; index++) {
            if (this.getNote(index))
                isEmpty = true;
        }
        return isEmpty;
    }

    get duration() {
        return this._duration;
    }

    set duration(value) {
        this._duration = Duration.Create(value);
    }

    get isPause() {
        return this._isPause;
    }

    set isPause(value) {
        this._isPause = value;
        if (value) 
            for(let index = 0; index < this._stringNum; index++)
                this.setNote(null);
    }
}

export default Chord;