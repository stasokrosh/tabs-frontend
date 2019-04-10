import { assert } from '../util'
import Chord from '../model/chord'
import NoteView from './note-view'
import Rect from './util/rect'
import * as Measures from './measures'
import { DURATION_FRACTIONS, DEFAULT_EIGHT_IN_QUATER_COUNT } from '../model/duration.js'
import DrawContext from './context/draw-context'

export function getChordWidth(chord) {
    return Measures.CHORD.HORIZONTAL_INTERVAL + (Math.log2(DURATION_FRACTIONS[DURATION_FRACTIONS.length - 1]) - Math.log2(chord.duration.fraction)) * 2;
}

export function getChordHeight(chord) {
    return Measures.NOTE.HEIGHT * chord.stringNum;
}

class ChordView {
    constructor(props) {
        assert(() => props);
        assert(() => props.parent);
        this._parent = props.parent;
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

    get parent() {
        return this._parent;
    }

    calculateRect(xPosition) {
        let width = Measures.NOTE.WIDTH;
        for (let noteView of this._noteViews) {
            noteView.calculateRect();
            if (noteView.rect.width > width) {
                width = noteView.rect.width;
            }
        }
        for (let noteView of this._noteViews) {
            if (noteView.rect.width !== width)
                noteView.rect.x = (width - noteView.rect.width) / 2;
        }
        this.rect.x = xPosition;
        this.rect.y = Measures.LINE.PADDING.TOP;
        this.rect.width = width;
        this.rect.height = getChordHeight(this._chord);
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
        return this._drawContext.renderChord(this, parent);
    }

    createNewNoteView(note, index) {
        return NoteView.Create({
            note: note,
            index: index,
            drawContext: this._drawContext,
            parent: this
        });
    }

    refresh() {
        for (let index = 0; index < this._chord.stringNum; index++) {
            let note = this._chord.getNote(index);

            this._noteViews[index] = this.createNewNoteView(note, index);

        }
    }

    get rect() {
        return this._rect;
    }

    get chord() {
        return this._chord;
    }

    get durationData() {
        let duration = this._chord.duration;
        let res = {};
        res.rect = Rect.Create({
            y: this._rect.height,
            width: this._rect.width,
            height: Measures.CHORD.DURATION.HEIGHT
        });
        let fractionLineXPos = duration.fraction > 4 ? (res.rect.width - Measures.CHORD.DURATION.EIGHTS_IN_4.WIDTH) / 2 : res.rect.width / 2;
        if (duration.quaterIs !== DEFAULT_EIGHT_IN_QUATER_COUNT) {
            res.quaterIsRect = Rect.Create({
                x: (res.rect.width - Measures.CHORD.DURATION.EIGHTS_IN_4.WIDTH) / 2,
                y: res.rect.y + res.rect.height - Measures.CHORD.DURATION.EIGHTS_IN_4.HEIGHT,
                width: Measures.CHORD.DURATION.EIGHTS_IN_4.WIDTH,
                height: Measures.CHORD.DURATION.EIGHTS_IN_4.HEIGHT
            });
        }
        if (duration.fraction !== 1) {
            let height = res.rect.height - Measures.CHORD.DURATION.EIGHTS_IN_4.HEIGHT - Measures.CHORD.DURATION.PADDING * 2;
            if (duration.fraction === 2)
                height /= 2;
            res.fractionLine = Rect.Create({
                x: fractionLineXPos,
                y: res.rect.y + Measures.CHORD.DURATION.PADDING,
                height: height,
            })
            if (duration.fraction > 4) {
                res.flagRects = [];
                let count = Math.log2(duration.fraction) - 2;
                for (let index = 0; index < count; index++) {
                    res.flagRects.push(Rect.Create({
                        x: res.fractionLine.x,
                        y: res.fractionLine.y + height - Measures.CHORD.DURATION.FLAG.HEIGHT - index * (Measures.CHORD.DURATION.FLAG.HEIGHT + Measures.CHORD.DURATION.FLAG.INTERVAL),
                        width: Measures.CHORD.DURATION.FLAG.WIDTH,
                        height: Measures.CHORD.DURATION.FLAG.HEIGHT
                    }));
                }
            }
        }
        if (duration.dot) {
            res.dotRect = Rect.Create({
                x: res.fractionLine.x + Measures.CHORD.DURATION.FLAG.WIDTH,
                y: res.fractionLine.y,
                width: Measures.CHORD.DURATION.DOT.WIDTH,
                height: Measures.CHORD.DURATION.DOT.HEIGHT
            })
        }
        return res;
    }

    get renderData() {
        let res = {
            rect: Rect.Create(this._rect),
            durationData: this.durationData
        };
        return res;
    }

    get drawContext() {
        return this._drawContext;
    }
}

export default ChordView;