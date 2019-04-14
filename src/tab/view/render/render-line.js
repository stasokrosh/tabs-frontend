import { assert } from "../../util";
import LineView from "../line-view";
import * as Draw from './draw'
import { renderLine } from "./util";

class LineSvgRenderer {
    constructor(props) {
        assert(() => props);
    }

    static Create(props) {
        return new LineSvgRenderer(props);
    }

    render(lineView, renderInfo, container) {
        assert(() => lineView instanceof LineView && renderInfo && container);
        this.renderStrings(renderInfo.stringRects, container);
        this.renderBorders(renderInfo.tactsBorderRects, container);
    }

    renderStrings(stringRects, container) {
        for (let stringRect of stringRects) {
            renderLine(container, stringRect, Draw.LINE.COLOR,Draw.LINE.WIDTH);
        }
    }

    renderBorders(borderRects, container) {
        for (let borderRect of borderRects) {
            renderLine(container, borderRect, Draw.LINE.COLOR,Draw.LINE.WIDTH);
        }
    }
}

export default LineSvgRenderer;