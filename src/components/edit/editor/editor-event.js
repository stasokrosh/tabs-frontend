/* eslint-disable default-case */
import { assert } from "./util";
import Editor from "./editor";

export const EVENT_CODES = {
    SELECT_NOTE: 1,
    SELECT_CHORD: 2,
    SELECT_TACT: 3,
    CLEAR_SELECTED: 4,
    ADD_CHORD: 5,
    SELECT_TRACK: 6,
    PLAY: 7,
    STOP: 8
}

export class EditorEvent {
    constructor(props) {
        assert(() => props);
        this._object = props.object;
        assert(() => props.code);
        this._code = props.code;
    }

    static Create(props) {
        return new EditorEvent(props);
    }

    static CreateSelectNoteEvent(props) {
        props.code = EVENT_CODES.SELECT_NOTE;
        return EditorEvent.Create(props);
    }

    static CreateSelectChordEvent(props) {
        props.code = EVENT_CODES.SELECT_CHORD;
        return EditorEvent.Create(props);
    }

    static CreateSelectTactEvent(props) {
        props.code = EVENT_CODES.SELECT_TACT;
        return EditorEvent.Create(props);
    }

    static CreateClearSelectedEvent() {
        return EditorEvent.Create({ code: EVENT_CODES.CLEAR_SELECTED });
    }

    static CreateAddChordEvent(props) {
        props.code = EVENT_CODES.ADD_CHORD;
        return EditorEvent.Create(props);
    }

    static CreateSelectTrackEvent(props) {
        props.code = EVENT_CODES.SELECT_TRACK;
        return EditorEvent.Create(props);
    }

    static CreatePlayEvent(props) {
        props.code = EVENT_CODES.PLAY;
        props.object = { animation : true };
        return EditorEvent.Create(props);
    }

    static CreateStopEvent(props) {
        props.code = EVENT_CODES.STOP;
        props.object = { animation : true };
        return EditorEvent.Create(props);
    }

    get code() {
        return this._code;
    }

    get object() {
        return this._object;
    }
}

export class EditorEventDispatcher {
    constructor(props) {
        assert(() => props);
        assert(() => props.editor instanceof Editor);
        this._editor = props.editor;
    }

    static Create(props) {
        return new EditorEventDispatcher(props);
    }

    dispatch(event) {
        if (this._editor.isPlaying && !event.object.animation)
            return;
        switch (event.code) {
            case EVENT_CODES.SELECT_NOTE: {
                if (event.object.note && this._editor.hasEditRights) {
                    if (this._editor.selectedNote === event.object.note)
                        this._editor.selectedNote = null;
                    else
                        this._editor.selectedNote = event.object.note;
                } else if (event.object.chord) {
                    event.object.chord.setNote(event.object.index, this._editor.createEmptyNote());
                    this._editor.selectedNote = event.object.chord.getNote(event.object.index);
                    this._editor.refreshChord();
                }
                this._editor.update(true);
                break;
            }
            case EVENT_CODES.SELECT_CHORD: {
                if (event.object.chord) {
                    if (this._editor.selectedChord === event.object.chord && !this._editor.selectedNote)
                        this._editor.selectedChord = null;
                    else
                        this._editor.selectedChord = event.object.chord;
                    this._editor.update(true);
                }
                break;
            }
            case EVENT_CODES.SELECT_TACT: {
                if (event.object.tact) {
                    if (this._editor.selectedTact === event.object.tact && !this._editor.selectedChord && !this._editor.selectedNote)
                        this._editor.selectedTact = null;
                    else
                        this._editor.selectedTact = event.object.tact;
                    this._editor.update(true);
                }
                break;
            }
            case EVENT_CODES.CLEAR_SELECTED: {
                this._editor.clearSelected();
                this._editor.update(true);
                break;
            }
            case EVENT_CODES.ADD_CHORD: {
                if (event.object.tact && this._editor.hasEditRights) {
                    event.object.tact.addChord(this._editor.createEmptyChord(), event.object.index);
                    this._editor._refreshTact(event.object.tact);
                    let index = ( event.object.index === -1 ? event.object.tact.chordCount - 1 : event.object.index );
                    this._editor.selectedChord = event.object.tact.getChord(index);
                    this._editor.update(true);
                }
                break;
            }
            case EVENT_CODES.SELECT_TRACK: {
                if (event.object.track) {
                    this._editor.selectedTrack = event.object.track;
                }
                break;
            }
            case EVENT_CODES.PLAY: {
                this._editor.play();
                break;
            }
            case EVENT_CODES.STOP: {
                this._editor.stop();
                break;
            }
        }
    }
}



