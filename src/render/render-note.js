import { assert } from "../util";
import Rect from "../view/rect";
import Note from "../model/note";

class NoteSvgRenderer {
    constructor(props) {
        assert(() => props);
    }

    Create(props) {
        return new NoteSvgRenderer(props);
    }

    render(note, rect, container) {
        assert(() => note instanceof Note && rect instanceof Rect && container)

    }
}

export default NoteSvgRenderer;