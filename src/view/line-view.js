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
        }
    }

    draw(parent) {
        let renderRes = this._draw(parent);
        for (let tactView of this._tactViews) {
            tactView.draw(renderRes);
        }
    }

    _draw(parent) {
        return this._drawContext.renderer.renderLine(this, parent);
    }

    set tactViews(value) {
        this._tactViews = [...value];
    }

    get rect() {
        return this._rect;
    }

    get stringsRectInfo() {
        let stringCount = this._track.instrument.getStringCount();
        return {
            rect: Rect.Create({
                x: this.rect.x,
                y: Measures.LINE.PADDING.TOP,
                width: this.width,
            }),
            stringCount : stringCount
        };
    }

}

export default LineView;
