import { assert } from './util'
import DrawContext from './view/context/draw-context'
import TrackView from './view/track-view'
import { EditorEventDispatcher } from './editor-event';
import { DEFAULT_EXCEPTION_FRET } from './model/note';
import EditorPosition from './editor-position';

class Editor {
    constructor(props) {
        assert(() => props);
        assert(() => props.composition);
        this._composition = props.composition;
        this._settings = {
            isVertical: true,
            zoom: 3,
            wrapPages: true
        };
        this._drawContext = DrawContext.Create();
        this._drawContext.addEventListener(this);
        this._eventDispatcher = EditorEventDispatcher.Create({ editor: this });
        this._editorPosition = EditorPosition.Create({ editor: this });
    }

    static Create(props) {
        return new Editor(props);
    }

    init(props) {
        assert(() => props);
        assert(() => props.containerID);
        assert(() => props.workspaceID);
        this._drawContext.init({
            containerID: props.containerID,
            workspaceID: props.workspaceID
        });
        this.selectedTrack = this._composition.getTrack(0);
    }

    _refreshTact(tact) {
        this._trackView.refreshTact(tact);
    }

    _refreshChord(chord) {
        this._trackView.refreshChord(chord);
    }

    refresh() {
        this._trackView.refresh();
    }

    refreshTact() {
        this._refreshTact(this.selectedTact);
    }

    refreshChord() {
        this._refreshChord(this.selectedChord);
    }

    update(forceCalculate) {
        this.prepare(forceCalculate);
        this.redraw();
        this.focus();
    }

    redraw() {
        this._drawContext.renderTrack(this._trackView);
    }

    prepare(forceCalculate) {
        this._drawContext.prepareRender(this._trackView, forceCalculate);
    }

    invokeEvent(event) {
        this._eventDispatcher.dispatch(event);
    }

    addEventListener(listener) {
        this._drawContext.addEventListener(listener);
    }

    get selectedTrack() {
        return this._selectedTrack;
    }

    set selectedTrack(value) {
        this._selectedTrack = value;
        this._trackView = TrackView.Create({
            track: this._selectedTrack,
            composition: this._composition,
            drawContext: this._drawContext,
            settings: this._settings
        });
        this._clearSelectedAll();
    }

    get settings() {
        return this._settings;
    }

    _savePrevSelected() {
        this._prevSelectedNote = this.selectedNote;
        this._prevSelectedChord = this.selectedChord;
        this._prevSelectedTact = this.selectedTact;
    }

    get selectedNote() {
        return this._selectedNote;
    }

    set selectedNote(value) {
        this._clearSelectedAll();
        this._selectedNote = value;
        if (this._selectedNote)
            this._selectedNote.selected = true;
        this._clearPrevSelectedAll();
    }

    _clearSelectedNote() {
        if (this._selectedNote) {
            this._selectedNote.selected = null;
        }
        this._selectedNote = null;
    }

    _clearPrevSelectedNote() {
        if (this._prevSelectedNote && this._prevSelectedNote.fret === DEFAULT_EXCEPTION_FRET && this._prevSelectedNote !== this.selectedNote) {
            let chord = this._prevSelectedChord;
            chord.setNote(chord.getNoteString(this._prevSelectedNote), null);
            this._prevSelectedNote = null;
            this._refreshChord(this._prevSelectedChord);
        }
        this._prevSelectedNote = null;
    }

    get selectedChord() {
        if (this._selectedChord) {
            return this._selectedChord;
        } else if (this._selectedNote) {
            return this._selectedTrack.getChordByNote(this._selectedNote);
        }
        return null;
    }

    set selectedChord(value) {
        this._clearSelectedAll();
        this._selectedChord = value;
        if (this._selectedChord)
            this._selectedChord.selected = true;
        this._clearPrevSelectedAll();
    }

    _clearSelectedChord() {
        if (this._selectedChord)
            this._selectedChord.selected = null;
        this._selectedChord = null;
    }

    _clearPrevSelectedChord() {
        if (this._prevSelectedChord && this._prevSelectedChord.isEmpty && this._prevSelectedChord !== this.selectedChord) {
            let tact = this._prevSelectedTact;
            tact.deleteChord(this._prevSelectedChord);
            this._refreshTact(tact);
        }
        this._prevSelectedChord = null;
    }

    get selectedTact() {
        if (this._selectedTact) {
            return this._selectedTact;
        } else if (this._selectedNote) {
            return this._selectedTrack.getTactByNote(this._selectedNote);
        } else if (this._selectedChord) {
            return this._selectedTrack.getTactByChord(this._selectedChord);
        }
        return null;
    }

    set selectedTact(value) {
        this._clearSelectedAll();
        this._selectedTact = value;
        if (this._selectedTact)
            this._selectedTact.selected = true;
        this._clearPrevSelectedAll();
    }

    _clearSelectedTact() {
        if (this._selectedTact)
            this._selectedTact.selected = null;
        this._selectedTact = null;
    }

    _clearPrevSelectedTact() {
        // if (this._prevSelectedTact && this._prevSelectedTact.chordCount === 0 && this._prevSelectedTact !== this.selectedTact) {
        //     if (this._selectedTrack.getTactNum(this._prevSelectedTact) === this._selectedTrack.tactCount - 1) {
        //         this._composition.deleteTact(this._prevSelectedTact.tact);
        //         this.refresh();
        //     }
        //     this.prevSelectedChord = null;
        // }
    }

    _clearSelectedAll() {
        this._savePrevSelected();
        this._clearSelectedNote();
        this._clearSelectedChord();
        this._clearSelectedTact();
    }

    _clearPrevSelectedAll() {
        this._clearPrevSelectedNote();
        this._clearPrevSelectedChord();
        this._clearPrevSelectedTact();
    }

    clearSelected() {
        this._clearSelectedAll();
        this._clearPrevSelectedAll();
    }

    set selectedFraction(value) {
        let selectedChord = this.selectedChord;
        if (selectedChord)
            selectedChord.duration.fraction = value;
    }

    set selectedDot(value) {
        let selectedChord = this.selectedChord;
        if (selectedChord)
            selectedChord.duration.dot = value;
    }

    set selectedQuaterIs(value) {
        let selectedChord = this.selectedChord;
        if (selectedChord)
            selectedChord.duration.quaterIs = value;
    }

    set selectedIsPause(value) {
        let selectedChord = this.selectedChord;
        if (selectedChord) {
            if (value) {
                this.selectedChord = selectedChord;
            }
            selectedChord.isPause = value;
        }
    }

    set selectedReprise(value) {
        let selectedTact = this.selectedTact;
        if (selectedTact)
            selectedTact.tact.reprise = value;
    }

    createEmptyChord() {
        const DEFAULT_FRACTION = 4;

        let selectedChord = this.selectedChord;
        if (selectedChord)
            return { duration: selectedChord.duration };
        else
            return {
                duration: {
                    fraction: DEFAULT_FRACTION
                }
            };
    }

    createEmptyTact() {
        let selectedTact = this.selectedTact;
        if (selectedTact)
            return { tactDuration: selectedTact.tact.tactDuration };
        else
            return null;
    }

    createEmptyNote() {
        return { fret: DEFAULT_EXCEPTION_FRET };
    }

    moveRight() {
        this._editorPosition.moveRight();
    }

    moveLeft() {
        this._editorPosition.moveLeft();
    }

    moveUp() {
        this._editorPosition.moveUp();
    }

    moveDown() {
        this._editorPosition.moveDown();
    }

    changeSelectedNote(value) {
        let selectedNote = this.selectedNote;
        if (selectedNote) {
            let fret = selectedNote.isEmpty ? 0 : selectedNote.fret;
            let newFret = fret * 10 + value;
            if (newFret <= selectedNote.maxFret) {
                selectedNote.fret = newFret;
            }
        }
    }

    clearSelectedNote() {
        let selectedNote = this.selectedNote;
        if (selectedNote && !selectedNote.isEmpty) {
            let fret = selectedNote.fret;
            let newFret = Math.floor(fret / 10);
            if (newFret === 0) {
                selectedNote.fret = DEFAULT_EXCEPTION_FRET;
            } else {
                selectedNote.fret = newFret;
            }
        }
    }

    focus() {
        this._drawContext.focus();
    }
}

export default Editor;