import { assert } from "../util";
import Rect from "../view/rect";
import Tact from "../model/tact";

class TactSvgRenderer {
    constructor(props) {
        assert(() => props);
    }

    Create(props) {
        return new TactSvgRenderer(props);
    }

    render(tact, index, renderDuration, rect, container) {
        assert(() => tact instanceof Tact && rect instanceof Rect && container)

    }
}

export default TactSvgRenderer;