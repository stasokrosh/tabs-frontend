import { assert } from "../../util";
import TactView from "../tact-view";

class TactSvgRenderer {
    constructor(props) {
        assert(() => props);
    }

    static Create(props) {
        return new TactSvgRenderer(props);
    }

    render(tactView, renderInfo, container) {
        assert(() => tactView instanceof TactView && renderInfo && container);
        //container.rect(renderInfo.rect.width, renderInfo.rect.height).fill("#99f");
        if (renderInfo.durationRect)
            container.rect(renderInfo.durationRect.width, renderInfo.durationRect.height).move(renderInfo.durationRect.x, renderInfo.durationRect.y).fill("#0f0");
    }
}

export default TactSvgRenderer;