import { assert } from './util'
import DrawContext from './view/context/draw-context'
import TrackView from './view/track-view'
import { EditorEventDispatcher, EditorEvent } from './editor-event';
import { DEFAULT_EXCEPTION_FRET } from './model/note';
import EditorPosition from './editor-position';
import Player from './player/player';

class Editor {
    constructor(props) {
        assert(() => props);
        this._settings = {
            isVertical: true,
            zoom: 3,
            wrapPages: true
        };
        this._drawContext = DrawContext.Create();
        this._drawContext.addEventListener(this);
        this._eventDispatcher = EditorEventDispatcher.Create({ editor: this });
        this._editorPosition = EditorPosition.Create({ editor: this });
        this.initialized = false;
        this._player = Player.Create({ editor: this });
    }

    static Create(props) {
        return new Editor(props);
    }

    async init(props) {
        assert(() => props);
        assert(() => props.containerID);
        assert(() => props.workspaceID);
        this._drawContext.init({
            containerID: props.containerID,
            workspaceID: props.workspaceID
        });
        assert(() => props.compositionProvider);
        this._compositionProvider = props.compositionProvider;
        this.selectedTrack = this._compositionProvider.composition.getTrack(0);
        await this._player.updateInstruments();
        this.initialized = true;
    }

    get drawContext() {
        return this._drawContext;
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
        if (this.initialized)
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

    get provider() {
        return this._compositionProvider;
    }

    get composition() {
        return this._compositionProvider.composition;
    }

    get tab() {
        return this._compositionProvider.tab;
    }

    set name(value) {
        this.composition.name = value;
        this._trackView.needDraw = true;
    }

    get name() {
        return this.composition.name;
    }

    changeTrackName(track, name) {
        track.name = name;
        this._trackView.needDraw = true;
    }

    set selectedTrack(value) {
        this._clearSelectedAll();
        this._clearPrevSelectedAll();
        this._selectedTrack = value;
        this._trackView = TrackView.Create({
            track: this._selectedTrack,
            composition: this._compositionProvider.composition,
            drawContext: this._drawContext,
            settings: this._settings
        });
        this._drawContext.invokeEvent(EditorEvent.CreateClearSelectedEvent());
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
        if (this.hasEditRights) {
            this._clearSelectedAll();
            this._selectedNote = value;
            if (this._selectedNote)
                this._selectedNote.selected = true;
            this._clearPrevSelectedAll();
        }
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
        if (this._prevSelectedTact && this._prevSelectedTact !== this.selectedTact)
            this.provider.updateTrackTactRequest(this._prevSelectedTact.id);
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
            this.provider.updateTactRequest({
                id: selectedTact.tact.id,
                reprise: value
            });
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

    async moveRight() {
        if (this.hasEditRights)
            await this._editorPosition.moveRight();
        else
            this._editorPosition.moveRightNoEdit();
    }

    moveLeft() {
        if (this.hasEditRights)
            this._editorPosition.moveLeft();
        else
            this._editorPosition.moveLeftNoEdit();
    }

    moveUp() {
        if (this.hasEditRights)
            this._editorPosition.moveUp();
    }

    moveDown() {
        if (this.hasEditRights)
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

    play() {
        let selectedTact = this.selectedTact;
        this.clearSelected();
        this._player.play(selectedTact);
    }

    stop() {
        this._player.stop();
    }

    get isPlaying() {
        return this._player.isPlaying;
    }

    get volume() {
        return this._player.volume;
    }

    set volume(value) {
        this._player.volume = value;
    }

    get loop() {
        return this._player.loop;
    }

    set loop(value) {
        this._player.loop = value;
    }

    async updateInstruments() {
        await this._player.updateInstruments();
    }

    get hasEditRights() {
        return this.provider.hasEditRights;
    }
}

export default Editor;