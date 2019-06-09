import { assert } from "./util";
import Editor from "./editor";

class EditorPosition {
    constructor(props) {
        assert(() => props);
        assert(() => props.editor instanceof Editor);
        this._editor = props.editor;
    }

    static Create(props) {
        return new EditorPosition(props);
    }

    async moveRight() {
        let selectedTact = this._editor.selectedTact;
        let selectedNote = this._editor.selectedNote;
        let selectedChord = this._editor.selectedChord;
        if (selectedTact && !selectedChord) {
            let tactNum = this._editor.selectedTrack.getTactNum(selectedTact);
            if (tactNum !== this._editor.selectedTrack.tactCount - 1)
                this._editor.selectedTact = this._editor.selectedTrack.getTact(tactNum + 1);
        } else if (selectedChord) {
            let chordNum = selectedTact.getChordNum(selectedChord);
            let tactNum = this._editor.selectedTrack.getTactNum(selectedTact);
            let nextTact = false;
            if (chordNum === selectedTact.chordCount - 1 && selectedChord.isEmptyExcept) {
                if (tactNum === this._editor.selectedTrack.tactCount - 1) {
                    await this._editor.provider.addTactRequest(this._editor.createEmptyTact());
                    this._editor.refresh();
                }
                selectedTact = this._editor.selectedTrack.getTact(tactNum + 1);
                chordNum = 0;
                nextTact = true;
            } else {
                chordNum++;
            }
            if (!selectedChord.isEmptyExcept || nextTact) {
                selectedTact.addChord(this._editor.createEmptyChord(), chordNum);
                this._editor._refreshTact(selectedTact);
                if (selectedNote) {
                    let index = selectedChord.getNoteString(selectedNote);
                    selectedChord = selectedTact.getChord(chordNum);
                    selectedChord.setNote(index, this._editor.createEmptyNote());
                    this._editor._refreshChord(selectedChord);
                    this._editor.selectedNote = selectedChord.getNote(index);
                } else {
                    this._editor.selectedChord = selectedTact.getChord(chordNum);
                }
            } else {
                if (selectedNote) {
                    let index = selectedChord.getNoteString(selectedNote);
                    selectedChord = selectedTact.getChord(chordNum);
                    let note = selectedChord.getNote(index);
                    if (!note) {
                        selectedChord.setNote(index, this._editor.createEmptyNote());
                        this._editor._refreshChord(selectedChord);
                        note = selectedChord.getNote(index);
                    }
                    this._editor.selectedNote = note;
                } else {
                    this._editor.selectedChord = selectedTact.getChord(chordNum);
                }
            }
        }
    }

    moveRightNoEdit() {
        let selectedTact = this._editor.selectedTact;
        let selectedChord = this._editor.selectedChord;
        if (selectedTact && !selectedChord) {
            let tactNum = this._editor.selectedTrack.getTactNum(selectedTact);
            if (tactNum !== this._editor.selectedTrack.tactCount - 1)
                this._editor.selectedTact = this._editor.selectedTrack.getTact(tactNum + 1);
        } else if (selectedChord) {
            let chordNum = selectedTact.getChordNum(selectedChord);
            if (chordNum === selectedTact.chordCount - 1) {
                let tactNum = this._editor.selectedTrack.getTactNum(selectedTact);
                if (tactNum !== this._editor.selectedTrack.tactCount - 1) {
                    let nextTact = this._editor.selectedTrack.getTact(tactNum + 1);
                    if (nextTact.chordCount === 0)
                        this._editor.selectedTact = nextTact;
                    else
                        this._editor.selectedChord = nextTact.getChord(0);
                }
            } else {
                this._editor.selectedChord = selectedTact.getChord(chordNum + 1);
            }
        }
    }

    moveLeftNoEdit() {
        let selectedTact = this._editor.selectedTact;
        let selectedChord = this._editor.selectedChord;
        if (selectedTact && !selectedChord) {
            let tactNum = this._editor.selectedTrack.getTactNum(selectedTact);
            if (tactNum !== 0)
                this._editor.selectedTact = this._editor.selectedTrack.getTact(tactNum - 1);
        } else if (selectedChord) {
            let chordNum = selectedTact.getChordNum(selectedChord);
            if (chordNum === 0) {
                let tactNum = this._editor.selectedTrack.getTactNum(selectedTact);
                if (tactNum !== 0) {
                    let prevTact = this._editor.selectedTrack.getTact(tactNum - 1);
                    if (prevTact.chordCount === 0)
                        this._editor.selectedTact = prevTact;
                    else
                        this._editor.selectedChord = prevTact.getChord(prevTact.chordCount - 1);
                }
            } else {
                this._editor.selectedChord = selectedTact.getChord(chordNum - 1);
            }
        }
    }

    moveLeft() {
        let selectedTact = this._editor.selectedTact;
        let selectedNote = this._editor.selectedNote;
        let selectedChord = this._editor.selectedChord;
        if (selectedTact && !selectedChord) {
            let tactNum = this._editor.selectedTrack.getTactNum(selectedTact);
            if (tactNum)
                this._editor.selectedTact = this._editor.selectedTrack.getTact(tactNum - 1);
        } else if (selectedChord) {
            let chordNum = selectedTact.getChordNum(selectedChord);
            let tactNum = this._editor.selectedTrack.getTactNum(selectedTact);
            let prevTact = false;
            if (chordNum === 0 && selectedChord.isEmptyExcept) {
                if (tactNum === 0) {
                    return;
                } else {
                    selectedTact = this._editor.selectedTrack.getTact(tactNum - 1);
                    chordNum = selectedTact.chordCount;
                }
                prevTact = true;
            } else if (selectedChord.isEmptyExcept) {
                chordNum--;
            }
            if (!selectedChord.isEmptyExcept || prevTact) {
                selectedTact.addChord(this._editor.createEmptyChord(), chordNum);
                this._editor._refreshTact(selectedTact);
                if (selectedNote) {
                    let index = selectedChord.getNoteString(selectedNote);
                    selectedChord = selectedTact.getChord(chordNum);
                    selectedChord.setNote(index, this._editor.createEmptyNote());
                    this._editor._refreshChord(selectedChord);
                    this._editor.selectedNote = selectedChord.getNote(index);
                } else {
                    this._editor.selectedChord = selectedTact.getChord(chordNum);
                }
            } else {
                if (selectedNote) {
                    let index = selectedChord.getNoteString(selectedNote);
                    selectedChord = selectedTact.getChord(chordNum);
                    let note = selectedChord.getNote(index);
                    if (!note) {
                        selectedChord.setNote(index, this._editor.createEmptyNote());
                        this._editor._refreshChord(selectedChord);
                        note = selectedChord.getNote(index);
                    }
                    this._editor.selectedNote = note;
                } else {
                    this._editor.selectedChord = selectedTact.getChord(chordNum);
                }
            }
        }
    }

    moveUp() {
        let selectedNote = this._editor.selectedNote;
        let selectedChord = this._editor.selectedChord;
        if (selectedChord) {
            if (selectedNote) {
                let index = selectedChord.getNoteString(selectedNote);
                if (index !== 0) {
                    let selectedNote = selectedChord.getNote(index - 1);
                    if (selectedNote) {
                        this._editor.selectedNote = selectedNote;
                    } else {
                        selectedChord.setNote(index - 1, this._editor.createEmptyNote());
                        this._editor._refreshChord(selectedChord);
                        this._editor.selectedNote = selectedChord.getNote(index - 1);
                    }
                }
            } else {
                selectedNote = selectedChord.getNote(selectedChord.stringNum - 1);
                if (!selectedNote) {
                    selectedChord.setNote(selectedChord.stringNum - 1, this._editor.createEmptyNote());
                    selectedNote = selectedChord.getNote(selectedChord.stringNum - 1);
                    this._editor._refreshChord(selectedChord);
                }
                this._editor.selectedNote = selectedNote;
            }
        }
    }

    moveDown() {
        let selectedNote = this._editor.selectedNote;
        let selectedChord = this._editor.selectedChord;
        if (selectedChord) {
            if (selectedNote) {
                let index = selectedChord.getNoteString(selectedNote);
                if (index !== selectedChord.stringNum - 1) {
                    let selectedNote = selectedChord.getNote(index + 1);
                    if (selectedNote) {
                        this._editor.selectedNote = selectedNote;
                    } else {
                        selectedChord.setNote(index + 1, this._editor.createEmptyNote());
                        this._editor._refreshChord(selectedChord);
                        this._editor.selectedNote = selectedChord.getNote(index + 1);
                    }
                }
            } else {
                selectedNote = selectedChord.getNote(0);
                if (!selectedNote) {
                    selectedChord.setNote(0, this._editor.createEmptyNote());
                    selectedNote = selectedChord.getNote(0);
                    this._editor._refreshChord(selectedChord);
                }
                this._editor.selectedNote = selectedNote;
            }
        }
    }
}

export default EditorPosition;