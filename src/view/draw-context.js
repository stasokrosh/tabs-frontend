import SvgRenderer from '../render';
import { assert } from '../util';

class DrawContext {
    constructor(props) {
        assert(() => props);
        assert(() => props.renderer);
        this._renderer = props.renderer;
    }
    
    static CreateSvgDrawContext(props) {
        let contextData = {
            renderer : SvgRenderer.Create(props)
        };
        return new DrawContext(contextData);
    }

    get renderer() {
        return this._renderer;
    }
}

export default DrawContext;