import { assert } from "../../util";
import ChordView from "../chord-view";
import { renderRect, renderText, renderLine } from './util'
import * as Draw from './draw'

class ChordSvgRenderer {
    constructor(props) {
        assert(() => props);
    }

    static Create(props) {
        return new ChordSvgRenderer(props);
    }

    render(chordView, renderInfo, container) {
        assert(() => chordView instanceof ChordView && renderInfo && container);
        this.renderDuration(chordView, renderInfo.durationData, container);
        if (chordView.chord.isPause)
            this.renderPause(chordView, renderInfo, container);
    }
    renderPause(chordView, renderInfo, container) {   
        container.image(process.env.PUBLIC_URL + "/images/pause.png").size(renderInfo.rect.width, renderInfo.rect.height);
    }

    renderDuration(chordView, durationData, container) {
        if (durationData.quaterIsRect) {
            renderText(container, chordView.chord.duration.quaterIs, durationData.quaterIsRect, {
                fill: Draw.CHORD.DURATION.COLOR, family: Draw.CHORD.DURATION.QUATER_IS.FONT
            });
        }
        if (durationData.fractionLine) {
            renderLine(container, durationData.fractionLine, Draw.CHORD.DURATION.COLOR, Draw.LINE.WIDTH);
        }
        if (durationData.flagRects) {
            for (let flagRect of durationData.flagRects) {
                renderRect(container, flagRect, Draw.CHORD.DURATION.COLOR);
            }
        }
        if (durationData.dotRect) {
            renderRect(container, durationData.dotRect, Draw.CHORD.DURATION.COLOR);
        }
    }
}

export default ChordSvgRenderer;