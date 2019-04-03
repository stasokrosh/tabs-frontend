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
    }
}

export default PageSvgRenderer;