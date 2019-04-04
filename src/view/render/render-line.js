import { assert } from "../../util";
import LineView from "../line-view";

class LineSvgRenderer {
    constructor(props) {
        assert(() => props);
    }

    static Create(props) {
        return new LineSvgRenderer(props);
    }

    render(lineView, renderInfo, container) {
        assert(() => lineView instanceof LineView && renderInfo && container);
        for (let stringRect of renderInfo.stringRects) {
            container.line(stringRect.x, stringRect.y, stringRect.x + stringRect.width, stringRect.y + stringRect.height)
                .stroke({ color: '#000', width: stringRect.height, linecap: 'round' })
        }
    }
}

export default LineSvgRenderer;