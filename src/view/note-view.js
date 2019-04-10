import { assert } from '../util'
import Rect from './util/rect'

import * as Measures from './measures'
import DrawContext from './context/draw-context'

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
        assert(() => props.parent);
        this._parent = props.parent;
        this._note = props.note;
        assert(() => props.drawContext instanceof DrawContext);
        this._drawContext = props.drawContext;
        this._index = props.index;
        this._rect = Rect.Create({});
    }

    static Create(props) {
        return new NoteView(props);
    }

    get parent() {
        return this._parent;
    }

    calculateRect() {
        this._rect.init(getNoteRect(this._index, this._note ? this._note.fret : 0));
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

    get drawContext() {
        return this._drawContext;
    }

    get index() {
        return this._index;
    }
}

export default NoteView;