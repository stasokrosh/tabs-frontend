import Tone from 'tone'
import { INSTRUMENT_VIEWS, INSTRUMENT_CODES } from '../model/instrument';

export function convertTactDurationToTime(tactDuration) {
    let fractionStr = tactDuration.fraction + 'n';
    return Tone.Time(fractionStr) * tactDuration.count;
}

export function convertDurationToTime(duration) {
    let fractionStr = duration.fraction + (duration.quaterIs === 3 ? 't' : 'n');
    return Tone.Time(fractionStr) * (duration.dot ? 1.5 : 1);
}


export function getNoteByChordNoteAndView(chordNote, instrumentView) {
    let baseNotes = getBaseNotesByInstrumentView(instrumentView);
    let noteNum = getNoteNumByChordNote(chordNote, baseNotes);
    return getNoteByNoteNum(noteNum);
}

export function getBaseNotesByInstrumentView(instrumentView) {
    switch (instrumentView) {
        case INSTRUMENT_VIEWS.GUITAR:
            return [29, 24, 20, 15, 10, 5];
        case INSTRUMENT_VIEWS.BASS:
            return [20, 15, 10, 5];
        default:
            return [];
    }
}

export function getNoteNumByChordNote(chordNote, baseNotes) {
    let stringNum = chordNote.index;
    return baseNotes[stringNum] + chordNote.item.fret;
}

export function getNoteByNoteNum(noteNum) {
    return getNoteNameByNum(noteNum % 12) + Math.ceil(noteNum / 12);
}

export function getNoteNameByNum(num) {
    switch (num) {
        case 1:
            return 'C';
        case 2:
            return 'C#';
        case 3:
            return 'D';
        case 4:
            return 'D#';
        case 5:
            return 'E';
        case 6:
            return 'F';
        case 7:
            return 'F#';
        case 8:
            return 'G';
        case 9:
            return 'G#';
        case 10:
            return 'A';
        case 11:
            return 'A#';
        case 0:
            return 'B'
        default:
            return '';
    }
}

export function getSamplePath(note, instrumentCode) {
    let folder = "";
    switch (instrumentCode) {
        case INSTRUMENT_CODES.GUITAR:
            folder = '/samples/guitar/';
            break;
        case INSTRUMENT_CODES.KEYS:
            folder = '/samples/keys/';
            break;
        default:
            folder = ""
    }
    return process.env.PUBLIC_URL + folder + note.replace('#', 's') + '.[mp3|ogg]';
}

export function getNotes(chord, instrumentView, withIndex) {
    let res = [];
    let chordNotes = chord.notes;
    for (let chordNote of chordNotes) {
        let note = getNoteByChordNoteAndView(chordNote, instrumentView)
        if (withIndex)
            res.push({
                index: chordNote.index,
                item: note
            })
        else
            res.push(note);
    }
    return res;
}
