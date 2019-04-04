import { assert } from "../../util";
import PageView from "../page-view";

class PageSvgRenderer {
    constructor(props) {
        assert(() => props);
    }

    static Create(props) {
        return new PageSvgRenderer(props);
    }

    render(pageView, renderInfo, container) {
        assert(() => pageView instanceof PageView && renderInfo && container);
        container.rect(renderInfo.rect.width, renderInfo.rect.height).fill("#fff");
        container.rect(renderInfo.numberRect.width, renderInfo.numberRect.height).move(renderInfo.numberRect.x, renderInfo.numberRect.y).fill("#ff5");
        if (renderInfo.headerRect)
            container.rect(renderInfo.headerRect.width, renderInfo.headerRect.height).move(renderInfo.headerRect.x, renderInfo.headerRect.y).fill("#ff0");
    }
}

export default PageSvgRenderer;