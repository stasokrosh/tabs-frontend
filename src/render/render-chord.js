import { assert } from "../util";
import Rect from "../view/rect";
import Chord from "../model/chord";

class ChordSvgRenderer {
    constructor(props) {
        assert(() => props);
    }

    Create(props) {
        return new ChordSvgRenderer(props);
    }

    render(chord, rect, container) {
        assert(() => chord instanceof Chord && rect instanceof Rect && container)

    }
}

export default ChordSvgRenderer;