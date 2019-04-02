import Rect from './rect'
import * as Measures from './measures'
import DrawContext from './draw-context';
import LineView from './line-view'
import { assert } from '../util';
import Track from '../model/track';

export function getPageRect(index, isVertical) {
    let rect = Rect.Create({
        width: Measures.PAGE.WIDTH,
        height: Measures.PAGE.HEIGHT
    });
    if (isVertical)
        rect.y = (Measures.PAGE.HEIGHT + Measures.PAGE.INTERVAL) * index;
    else
        rect.x = (Measures.PAGE.WIDTH + Measures.PAGE.INTERVAL) * index;
    return rect;
}

class PageView {
    constructor(props) {
        assert(() => props);
        assert(() => props.drawContext instanceof DrawContext);
        this._drawContext = props.drawContext;
        assert(() => props.track instanceof Track);
        this._track = props.track;
        this._rect = Rect.Create({});
        this._lineViews = [];
    }

    static Create(props) {
        return new PageView(props);
    }

    calculateRect(index, isVertical) {
        this._index = index;
        this._rect = getPageRect(index, isVertical);
    }

    get lineViewsCount() {
        return this._lineViews.length;
    }

    get lineViews() {
        return [...this._lineViews]
    }

    getLineView(index) {
        return this._lineViews[index];
    }

    deleteLineView(index) {
        assert(() => index < this.lineViews.length);
        if (index !== -1) {
            this.lineViews[index].remove();
            this.lineViews.splice(index, 1);
        }
    }

    addLineView(lineView) {
        assert(() => lineView instanceof LineView);
        this._lineViews.push(lineView);
    }

    clear() {
        for (let lineView of this._lineViews) {
            lineView.remove();
        }
        this._lineViews.length = 0;
    }

    calculateLinesRects() {
        for (let index = 0; index < this._lineViews.length; index++) {
            this._lineViews[index].calculateRect(index, this._index === 0);
        }
    }

    draw(parent) {
        let renderRes = this._draw(parent);
        for (let lineView of this._lineViews) {
            lineView.draw(renderRes);
        }
    }

    _draw(parent) {
        return this._drawContext.renderer.renderPage(this, parent);
    }

    get rect() {
        return this._rect;
    }

    get index() {
        return this._index;
    }

    get track() {
        return this._track;
    }
}

export default PageView;