import Rect from './rect'
import { assert } from '../util';
import DrawContext from './draw-context';
import * as Measures from './measures'
import Track from '../model/track';

export function getLineRect(index, isTitlePage) {
    let rect = Rect.Create({
        width: Measures.LINE.WIDTH,
        height: Measures.LINE.HEIGHT,
        x: Measures.PAGE.PADDING.HORIZONTAL
    });
    rect.y = Measures.PAGE.PADDING.VERTICAL;
    if (isTitlePage)
        rect.y += Measures.getHeaderHeight();
    rect.y += index * Measures.LINE.HEIGHT;
    return rect;
}

class LineView {
    constructor(props) {
        assert(() => props);
        assert(() => props.drawContext instanceof DrawContext);
        this._drawContext = props.drawContext;
        assert(() => props.track instanceof Track);
        this._track = props.track;
        this._tactViews = [];
        this._rect = Rect.Create({});
    }

    static Create(props) {
        return new LineView(props);
    }

    calculateRect(index, isTitlePage) {
        this._rect = getLineRect(index, isTitlePage);
    }

    calculateTactsWidth(optimize) {
        if (optimize) {
            let tactCount = this._tactViews.length;
            if (tactCount > 0) {
                let tactsWidth = 0;
                for (let tactView of this._tactViews) {
                    tactsWidth += tactView.rect.width;
                }
                let addWidth = (this._rect.width - tactsWidth) / tactCount;
                let position = this._tactViews[0].rect.x;
                for (let tactView of this._tactViews) {
                    let newTactWidth = tactView.rect.width + addWidth;
                    tactView.rect.width = newTactWidth;
                    tactView.rect.x = position;
                    position += newTactWidth;
                }
            }
        } else {
            let position = 0;
            for (let tactView of this._tactViews) {
                tactView.rect.x = position;
                position += tactView.rect.width;
            }
            this._rect.width = position;
        }
    }

    draw(parent) {
        let renderRes = this._draw(parent);
        for (let tactView of this._tactViews) {
            tactView.draw(renderRes);
        }
    }

    _draw(parent) {
        return this._drawContext.renderLine(this, parent);
    }

    set tactViews(value) {
        this._tactViews = [...value];
    }

    get rect() {
        return this._rect;
    }

    get stringRects() {
        let res = [];
        let stringCount = this._track.instrument.getStringCount();
        let yPos = this._rect.y + Measures.TACT.Y_POS;
        for (let index = 0; index < stringCount; index++) {
            res.push(Rect.Create({
                x : this._rect.x,
                y : yPos,
                width : this._rect.width
            }));
            yPos += Measures.LINE.STRING_INTERVAL;
        }
        return res;
    }

    get renderData() {
        let res = {
            rect : Rect.Create(this._rect),
            stringRects : this.stringRects
        }
        return res;
    }

}

export default LineView;
