import { assert } from "../../util";
import NoteView from "../note-view";

class NoteSvgRenderer {
    constructor(props) {
        assert(() => props);
    }

    static Create(props) {
        return new NoteSvgRenderer(props);
    }

    render(noteView, renderInfo, container) {
        assert(() => noteView instanceof NoteView && renderInfo && container);
        container.rect(renderInfo.rect.width, renderInfo.rect.height).fill("#0f0");
    }
}

export default NoteSvgRenderer;