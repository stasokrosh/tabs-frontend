import { assert } from "../../util"
import TactView from "../tact-view"
import * as Draw from './draw'
import { renderText, renderRect, renderLine } from "./util";

class TactSvgRenderer {
    constructor(props) {
        assert(() => props);
    }

    static Create(props) {
        return new TactSvgRenderer(props);
    }

    render(tactView, renderInfo, container) {
        assert(() => tactView instanceof TactView && renderInfo && container);
        if (renderInfo.durationCountRect && renderInfo.durationFractionRect) {
            this.renderDuration(tactView, renderInfo.durationCountRect, renderInfo.durationFractionRect, container);
        }
        this.renderNumber(tactView, renderInfo.numberRect, container);
        if (renderInfo.repriseData) {
            this.renderReprise(renderInfo.repriseData, container);
        }
    }

    renderDuration(tactView, countRect, fractionRect, container) {
        renderText(container, tactView.tact.tact.tactDuration.count, countRect, {
            fill: Draw.TACT.DURATION.COLOR,
            family: Draw.TACT.DURATION.FONT
        });
        renderText(container, tactView.tact.tact.tactDuration.fraction, fractionRect, {
            fill: Draw.TACT.DURATION.COLOR,
            family: Draw.TACT.DURATION.FONT
        });
    }

    renderNumber(tactView, rect, container) {
        renderText(container, tactView.index + 1, rect, {
            fill: Draw.TACT.NUMBER.COLOR,
            family: Draw.TACT.NUMBER.FONT,
        });
    }

    renderReprise(repriseData, container) {
        renderRect(container, repriseData.rect, Draw.TACT.REPRISE.COLOR);
        renderLine(container, repriseData.line, Draw.TACT.REPRISE.COLOR, Draw.LINE.WIDTH);
    }
}

export default TactSvgRenderer;