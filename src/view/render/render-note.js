import { assert } from "../../util";
import NoteView from "../note-view";
import { DEFAULT_EXCEPTION_FRET } from "../../model/note";
import * as Draw from './draw'
import { renderText, renderRect } from "./util";

class NoteSvgRenderer {
    constructor(props) {
        assert(() => props);
    }

    static Create(props) {
        return new NoteSvgRenderer(props);
    }

    render(noteView, renderInfo, container) {
        assert(() => noteView instanceof NoteView && renderInfo && container);
        this.renderFret(noteView, renderInfo.rect, container);
    }

    renderFret(noteView, rect, container) {
        renderRect(container, rect, Draw.NOTE.BACKGROUND_COLOR, true);
        let text = noteView.note.fret === DEFAULT_EXCEPTION_FRET ? '' : noteView.note.fret;
        renderText(container, text, rect, {
            fill : Draw.NOTE.COLOR,
            family : Draw.NOTE.FONT
        }, true);
    }
}

export default NoteSvgRenderer;