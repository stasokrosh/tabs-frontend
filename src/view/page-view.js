import Rect from './util/rect'
import * as Measures from './measures'
import DrawContext from './context/draw-context';
import LineView from './line-view'
import { assert } from '../util';
import Track from '../model/track';

export function getPageRect(index, isVertical, rowPageCount) {
    let colIndex = index % rowPageCount;
    let rowIndex = Math.floor(index / rowPageCount);
    let rect = Rect.Create({
        width: Measures.PAGE.WIDTH,
        height: Measures.PAGE.HEIGHT
    });
    if (isVertical) {
        rect.y = Measures.PAGE.INTERVAL + (Measures.PAGE.HEIGHT + Measures.PAGE.INTERVAL) * rowIndex;
        rect.x = Measures.PAGE.INTERVAL + (Measures.PAGE.INTERVAL + Measures.PAGE.WIDTH) * colIndex;
    } else {
        rect.x = Measures.PAGE.INTERVAL + (Measures.PAGE.WIDTH + Measures.PAGE.INTERVAL) * rowIndex;
        rect.y = Measures.PAGE.INTERVAL  + (Measures.PAGE.INTERVAL + Measures.PAGE.HEIGHT) * colIndex;
    }
    return rect;
}

class PageView {
    constructor(props) {
        assert(() => props);
        assert(() => props.drawContext instanceof DrawContext);
        this._drawContext = props.drawContext;
        assert(() => props.track instanceof Track);
        this._track = props.track;
        assert(() => props.composition);
        this._composition = props.composition;
        this._rect = Rect.Create({});
        this._lineViews = [];
    }

    static Create(props) {
        return new PageView(props);
    }

    calculateRect(index, isVertical, rowPageCount) {
        this._index = index;
        this._rect = getPageRect(index, isVertical, rowPageCount);
        this._isVertical = isVertical;
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
        return this._drawContext.renderPage(this, parent);
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

    get isVertical() {
        return this._isVertical;
    }

    get headerRect() {
        return Rect.Create({
            x: Measures.HEADER.X,
            y: Measures.HEADER.Y,
            width: Measures.HEADER.WIDTH,
            height: Measures.HEADER.HEIGHT
        })
    }

    get compositionHeaderRect() {
        return Rect.Create({
            x: Measures.HEADER.X,
            y: Measures.HEADER.Y + Measures.COMPOSITION_HEADER.MARGIN,
            width : Measures.COMPOSITION_HEADER.WIDTH,
            height : Measures.COMPOSITION_HEADER.HEIGHT
        })
    }

    get trackHeaderRect() {
        return Rect.Create({
            x: Measures.TRACK_HEADER.X,
            y: Measures.TRACK_HEADER.Y,
            width : Measures.TRACK_HEADER.WIDTH,
            height : Measures.TRACK_HEADER.HEIGHT
        })
    }

    get numberRect() {
        let width = ((this._index + 1) + '').length * Measures.PAGE.NUMBER.WIDTH;
        return Rect.Create({
            x: this._rect.width - width - Measures.PAGE.NUMBER.WIDTH,
            y: this._rect.height - 2 * Measures.PAGE.NUMBER.HEIGHT,
            width: width,
            height: Measures.PAGE.NUMBER.HEIGHT
        })
    }

    get renderData() {
        let res = {
            rect: Rect.Create(this._rect),
            numberRect: this.numberRect
        };
        if (this._index === 0) {
            res.headerRect = this.headerRect;
            res.compositionHeaderRect = this.compositionHeaderRect;
            res.trackHeaderRect = this.trackHeaderRect;
        }
        return res
    }

    get DrawContext() {
        return this._drawContext;
    }
    
    get composition() {
        return this._composition;
    }
}

export default PageView;