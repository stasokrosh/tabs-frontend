import { assert } from "../../util"
import TactView from "../tact-view"
import * as Draw from './draw'
import { renderText, renderRect, renderLine } from "./util";
import { EditorEvent } from "../../editor/editor-event";

class TactSvgRenderer {
    constructor(props) {
        assert(() => props);
    }

    static Create(props) {
        return new TactSvgRenderer(props);
    }

    render(tactView, renderInfo, container) {
        assert(() => tactView instanceof TactView && renderInfo && container);
        container.click((e) => {
            tactView.drawContext.invokeEvent(EditorEvent.CreateSelectTactEvent({ object: tactView.tact }));
            e.stopPropagation();
        });
        this.renderSelection(renderInfo, tactView.tact.selected, renderInfo.rect, container);
        if (renderInfo.durationCountRect && renderInfo.durationFractionRect) {
            this.renderDuration(tactView, renderInfo.durationCountRect, renderInfo.durationFractionRect, container);
        }
        this.renderNumber(tactView, renderInfo.numberRect, container);
        if (renderInfo.repriseData) {
            this.renderReprise(renderInfo.repriseData, container);
        }
    }

    renderSelection(renderInfo, selected, rect, container) {
        renderRect(container, rect, selected ? Draw.TACT.BACKGROUND_COLOR_SELECTED : Draw.TACT.BACKGROUND_COLOR, true);
        if (selected) {
            container.selectionColor = Draw.TACT.BACKGROUND_COLOR_SELECTED;
            let stringRects = renderInfo.getStringRects();
            let borderRects = renderInfo.getBorderRects();
            for (let stringRect of stringRects) {
                renderLine(container, stringRect, Draw.LINE.COLOR, Draw.LINE.WIDTH);
            }
            for (let borderRect of borderRects) {
                renderLine(container, borderRect, Draw.LINE.COLOR, Draw.LINE.WIDTH);
            }
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