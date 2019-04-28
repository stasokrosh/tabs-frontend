import { assert } from "../../util";
import NoteView from "../note-view";
import { DEFAULT_EXCEPTION_FRET } from "../../model/note";
import * as Draw from './draw'
import { renderText, renderRect } from "./util";
import { EditorEvent } from "../../editor-event";

class NoteSvgRenderer {
    constructor(props) {
        assert(() => props);
    }

    static Create(props) {
        return new NoteSvgRenderer(props);
    }

    render(noteView, renderInfo, container) {
        assert(() => noteView instanceof NoteView && renderInfo && container);

        container.click((e) => {
            if (noteView.note)
                noteView.drawContext.invokeEvent(EditorEvent.CreateSelectNoteEvent({
                    object: {
                        note: noteView.note
                    }
                }));
            else
                noteView.drawContext.invokeEvent(EditorEvent.CreateSelectNoteEvent({
                    object: {
                        index: noteView.index,
                        chord: noteView.parent.chord
                    }
                }));
            e.stopPropagation();
            e.preventDefault();
        });
        container.on('contextmenu',(e) => {
            noteView.drawContext.invokeEvent(EditorEvent.CreateSelectChordEvent({
                object: {
                    chord : noteView.parent.chord
                }
            }));
            e.stopPropagation();
            e.preventDefault();
        });

        this.renderSelection(noteView, renderInfo.rect, container);
        this.renderFret(noteView, renderInfo.rect, container);
    }

    renderSelection(noteView, rect, container) {
        let color = !noteView.note ? null :
            container.selectionColor ? container.selectionColor :
                (noteView.note.selected ? Draw.NOTE.BACKGROUND_COLOR_SELECTED : Draw.NOTE.BACKGROUND_COLOR);
        renderRect(container, rect, color, true);
    }

    renderFret(noteView, rect, container) {
        let text = !noteView.note || (noteView.note && noteView.note.fret === DEFAULT_EXCEPTION_FRET) ? '' : noteView.note.fret;
        renderText(container, text, rect, {
            fill: Draw.NOTE.COLOR,
            family: Draw.NOTE.FONT
        }, true);
    }
}

export default NoteSvgRenderer;