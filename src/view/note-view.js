import { assert } from '../util'
import Note from '../model/note'
import Rect from './rect'

import * as Measures from './measures'
import DrawContext from './draw-context';

export function getNoteRect(index, fret) {
    return {
        x: 0,
        y: Measures.LINE.STRING_INTERVAL * index,
        height: Measures.NOTE.HEIGHT,
        width : (fret < 10 ? 1 : 2) * Measures.NOTE.WIDTH
    };
}

class NoteView {
    constructor(props) {
        assert(() => props);
        assert(() => props.note instanceof Note);
        this._note = props.note;
        assert(() => props.drawContext instanceof DrawContext);
        this._drawContext = props.drawContext;
        this._index = props.index;
        this._rect = Rect.Create({});
    }

    static Create(props) {
        return new NoteView(props);
    }

    calculateRect() {
        this._rect.init(getNoteRect(this._index, this._note.fret));
    }

    draw(parent) {
        this._draw(parent);
    }

    _draw(parent) {
        this._drawContext.renderNote(this, parent);
    }

    get rect() {
        return this._rect;
    }

    get note() {
        return this._note;
    }

    get renderData() {
        let res = {
            rect : Rect.Create(this._rect)
        }
        return res;
    }
}

export default NoteView;