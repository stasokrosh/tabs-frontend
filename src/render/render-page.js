import { assert } from "../util";
import Rect from "../view/rect";
import Track from "../model/track";

class PageSvgRenderer {
    constructor(props) {
        assert(() => props);
    }

    Create(props) {
        return new PageSvgRenderer(props);
    }

    render(index, track, rect, container) {
        assert(() => track instanceof Track && rect instanceof Rect && container)

    }
}

export default PageSvgRenderer;