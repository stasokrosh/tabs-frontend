/* eslint-disable default-case */
import { assert } from "../util";
import Editor from "./editor";
import Note from "../model/note";

const EVENT_CODES = {
    SELECT_NOTE: 1,
    SELECT_CHORD: 2,
    SELECT_TACT: 3,
    CLEAR_SELECTED: 4
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
        switch (event.code) {
            case EVENT_CODES.SELECT_NOTE: {
                if (event.object instanceof Note) {
                    if (this._editor.selectedNote === event.object)
                        this._editor.selectedNote = null;
                    else
                        this._editor.selectedNote = event.object;
                } else {
                    event.object.chord.setNote(event.object.index, this._editor.createEmptyNote());
                    this._editor.selectedNote = event.object.chord.getNote(event.object.index);
                    this._editor.refreshChord();
                }
                this._editor.update(true);
                break;
            }
            case EVENT_CODES.SELECT_CHORD: {
                if (this._editor.selectedChord === event.object && !this._editor.selectedNote)
                    this._editor.selectedChord = null;
                else
                    this._editor.selectedChord = event.object;
                this._editor.update(true);
                break;
            }
            case EVENT_CODES.SELECT_TACT: {
                if (this._editor.selectedTact === event.object && !this._editor.selectedChord && !this._editor.selectedNote)
                    this._editor.selectedTact = null;
                else
                    this._editor.selectedTact = event.object;
                this._editor.update(true);
                break;
            }

            case EVENT_CODES.CLEAR_SELECTED: {
                this._editor.clearSelected();
                this._editor.update(true);
                break;
            }
        }
    }
}



