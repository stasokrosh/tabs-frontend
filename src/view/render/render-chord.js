import { assert } from "../../util";
import ChordView from "../chord-view";

class ChordSvgRenderer {
    constructor(props) {
        assert(() => props);
    }

    static Create(props) {
        return new ChordSvgRenderer(props);
    }

    render(chordView, renderInfo, container) {
        assert(() => chordView instanceof ChordView && renderInfo && container);
        container.rect(renderInfo.rect.width, renderInfo.rect.height).fill("#f00");
    }
}

export default ChordSvgRenderer;