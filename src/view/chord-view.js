import { assert } from '../util'
import Chord from '../model/chord'
import NoteView from './note-view'
import Rect from './rect'
import * as Measures from './measures'
import { DURATION_FRACTIONS } from '../model/duration.js'
import DrawContext from './draw-context'

export function getChordWidth(chord) {
    return Measures.NOTE.HORIZONTAL_INTERVAL * (Math.log2(DURATION_FRACTIONS[DURATION_FRACTIONS.length - 1]) - Math.log2(chord.duration.fraction));
}

class ChordView {
    constructor(props) {
        assert(() => props);
        assert(() => props.chord instanceof Chord);
        this._chord = props.chord;
        assert(() => props.drawContext instanceof DrawContext);
        this._drawContext = props.drawContext;
        this._noteViews = new Array(this._chord.stringNum);
        this._rect = Rect.Create({});
        this.refresh();
    }

    static Create(props) {
        return new ChordView(props);
    }

    calculateRect(xPosition) {
        let width = Measures.NOTE.WIDTH;
        for (let noteView of this._noteViews) {
            if (noteView) {
                noteView.calculateRect();
                if (noteView.rect.width > width) {
                    width = noteView.rect.width;
                }
            }
        }
        this.rect.x = xPosition;
        this.rect.y = Measures.LINE.PADDING.TOP;
        this.rect.width = width;
        this.rect.height = Measures.getChordHeight();
        this.chordWidth = getChordWidth(this._chord);
    }

    draw(parent) {
        let renderRes = this._draw(parent);
        for (let noteView of this._noteViews) {
            if (noteView) {
                noteView.draw(renderRes);
            }
        }
    }

    _draw(parent) {
        return this._drawContext.renderer.renderChord(this, parent);
    }

    refresh() {
        for (let index = 0; index < this._chord.stringNum; index++) {
            let note = this._chord.getNote(index);
            if (note) {
                if (!this._noteViews[index]) {
                    this._noteViews[index] = NoteView.Create({ 
                        note : note, 
                        index : index,
                        drawContext : this._drawContext
                    });
                }
            } else if (this._noteViews[index]) {
                this._noteViews[index].remove();
                delete this._noteViews[index];
            }
        }
    }

    get rect() {
        return this._rect;
    }

    get chord() {
        return this._chord;
    }
}

export default ChordView;