import { assert } from "../util";
import Rect from "../view/rect";

class LineSvgRenderer {
    constructor(props) {
        assert(() => props);
    }

    Create(props) {
        return new LineSvgRenderer(props);
    }

    render(stringsRectInfo, rect, container) {
        assert(() => stringsRectInfo && rect instanceof Rect && container)

    }
}

export default LineSvgRenderer;