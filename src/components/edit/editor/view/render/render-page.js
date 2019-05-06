import { assert } from "../../util"
import PageView from "../page-view"
import * as Draw from './draw'
import { renderText, renderRect } from "./util";
import { EditorEvent } from "../../editor-event";

class PageSvgRenderer {
    constructor(props) {
        assert(() => props);
    }

    static Create(props) {
        return new PageSvgRenderer(props);
    }

    render(pageView, renderInfo, container) {
        assert(() => pageView instanceof PageView && renderInfo && container);
        container.click((e) => { 
            pageView.drawContext.invokeEvent(EditorEvent.CreateClearSelectedEvent());
            e.stopPropagation();
        });
        this.renderBackground(renderInfo.rect, container);
        this.renderNumber(pageView, renderInfo.numberRect, container);
        if (renderInfo.headerRect)
            this.renderHeader(pageView, renderInfo.compositionHeaderRect, renderInfo.trackHeaderRect, container);
    }

    renderBackground(rect, container) {
        renderRect(container, rect, Draw.PAGE.COLOR, true);
    }

    renderNumber(pageView, rect, container) {
        renderText(container, pageView.index + 1, rect, {
            fill: Draw.PAGE.NUMBER.COLOR, 
            family: Draw.PAGE.NUMBER.FONT,
        });
    }

    renderHeader(pageView, compositionHeaderRect, trackHeaderRect, container) {
        renderText(container, pageView.composition.name, compositionHeaderRect, {
            fill: Draw.PAGE.HEADER.COLOR, 
            family: Draw.PAGE.HEADER.FONT,
        });
        renderText(container, pageView.track.name, trackHeaderRect, {
            fill: Draw.PAGE.HEADER.COLOR, 
            family: Draw.PAGE.HEADER.FONT,
        });
    }
}

export default PageSvgRenderer;