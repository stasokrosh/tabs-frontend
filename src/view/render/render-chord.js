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
        container.rect(renderInfo.durationRect.width, renderInfo.durationRect.height).move(renderInfo.durationRect.x, renderInfo.durationRect.y).fill("#f99");
    }
}

export default ChordSvgRenderer;