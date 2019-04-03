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
    }
}

export default LineSvgRenderer;