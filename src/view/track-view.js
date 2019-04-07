import { assert } from '../util'
import Track from '../model/track'
import TactView from './tact-view'
import DrawContext from './context/draw-context'
import * as Measures from './measures'
import LineView from './line-view';
import PageView from './page-view';
import Rect from './util/rect';

class TrackView {
    constructor(props) {
        assert(() => props);
        assert(() => props.track instanceof Track);
        this._track = props.track;
        assert(() => props.drawContext instanceof DrawContext);
        this._drawContext = props.drawContext;
        assert(() => props.settings);
        this._settings = props.settings;
        assert(() => props.composition);
        this._composition = props.composition;
        this._tactViews = [];
        this._pageViews = [];
        this._rect = Rect.Create({});
        this.refresh();
    }

    static Create(props) {
        return new TrackView(props);
    }

    createNewTactView(tact) {
        return TactView.Create({
            tact: tact,
            track: this._track,
            drawContext: this._drawContext
        })
    }

    createNewPageView() {
        return PageView.Create({
            drawContext: this._drawContext,
            track: this._track,
            composition: this._composition
        });
    }

    createNewLineView() {
        return LineView.Create({
            drawContext: this._drawContext,
            track: this._track
        });
    }

    getRowPageCount(availableRect) {
        if (!this._settings.wrapPages)
            return 1;
        let count = 0;
        if (this._settings.isVertical) {
            count = Math.floor((availableRect.width - Measures.PAGE.INTERVAL) / (Measures.PAGE.INTERVAL + Measures.PAGE.WIDTH));
        } else {
            count = Math.floor((availableRect.height - Measures.PAGE.INTERVAL) / (Measures.PAGE.INTERVAL + Measures.PAGE.HEIGHT));
        }
        if (count === 0)
            count++;
        return count;
    }

    refresh() {
        let tactSet = new Set(this._track.tacts);
        let index = 0;
        while (index < this._tactViews.length) {
            if (!tactSet.has(this._tactViews[index].tact))
                this._tactViews.splice(index, 1);
            else
                index++;
        }
        let tactMap = new Map();
        for (let tactView of this._tactViews) {
            tactMap.set(tactView.tact, tactView);
        }
        this._tactViews.length = 0;

        for (let tact of tactSet) {
            let tactView = tactMap.get(tact);
            if (tactView)
                this._tactViews.push(tactView);
            else
                this._tactViews.push(this.createNewTactView(tact));
        }
        this._updated = true;
    }

    _calculateSelfRect(rowPageCount) {
        let verticalCount = 1;
        let horizontalCount = 1;
        const pagesCount = this._pageViews.length;
        if (this._settings.isVertical) {
            verticalCount = Math.floor(pagesCount / rowPageCount);
            horizontalCount = pagesCount % rowPageCount
            if (verticalCount === 0) {
                verticalCount++;
            } else {
                if (horizontalCount !== 0) {
                    verticalCount++;
                }
                horizontalCount = rowPageCount;
            }
        } else {
            horizontalCount = Math.floor(pagesCount / rowPageCount);
            verticalCount = pagesCount % rowPageCount
            if (horizontalCount === 0) {
                horizontalCount++;
            } else {
                if (verticalCount !== 0) {
                    horizontalCount++;
                }
                verticalCount = rowPageCount;
            }
        }
        this._rect.width = Measures.PAGE.INTERVAL + (Measures.PAGE.INTERVAL + Measures.PAGE.WIDTH) * horizontalCount;
        this._rect.height = Measures.PAGE.INTERVAL + (Measures.PAGE.INTERVAL + Measures.PAGE.HEIGHT) * verticalCount;
    }

    calculateRect(availableRect) {
        let rowPageCount = this.getRowPageCount(availableRect);
        if (!this._updated) {
            if (rowPageCount > this._pageViews.length)
                rowPageCount = this._pageViews.length;
            this._updated = rowPageCount === this._rowPageCount;
        }
        if (this._updated) {
            const lineWidth = Measures.LINE.WIDTH;
            let lines = [];
            let currentLine = [];
            let currentLineWidth = 0;
            for (let tactView of this._tactViews) {
                tactView.calculateContence();
                currentLineWidth += tactView.rect.width;
                if (currentLineWidth > lineWidth) {
                    lines.push({
                        line: currentLine,
                        optimize: true
                    });
                    currentLine = [tactView];
                    currentLineWidth = tactView.rect.width;
                } else {
                    currentLine.push(tactView);
                }
            }
            if (currentLineWidth !== 0)
                lines.push({
                    line: currentLine,
                    optimize: false
                });
            let globalLineIndex = 0;
            let pageIndex = 0;
            while (globalLineIndex < lines.length) {
                let pageView = this._pageViews[pageIndex];
                if (!pageView) {
                    pageView = this.createNewPageView();
                    this._pageViews.push(pageView);
                }
                let linesCount = pageIndex === 0 ? Measures.PAGE.TITLE_LINES_COUNT : Measures.PAGE.LINES_COUNT;
                let lineIndex = 0;
                while (lineIndex < linesCount && globalLineIndex < lines.length) {
                    let lineView = pageView.getLineView(lineIndex);
                    if (!lineView) {
                        lineView = this.createNewLineView();
                        pageView.addLineView(lineView);
                        lineView.calculateRect(lineIndex, pageIndex === 0);
                    }
                    lineView.tactViews = lines[globalLineIndex].line;
                    lineView.calculateTactsWidth(lines[globalLineIndex].optimize);
                    lineIndex++;
                    globalLineIndex++;
                }
                if (lineIndex < pageView.linesCount) {
                    for (let index = pageView.linesCount; index >= lineIndex; index--) {
                        pageView.deleteLineView(index);
                    }
                }
                pageIndex++;
            }
            if (pageIndex < this._pageViews.length) {
                for (let index = this._pageViews.length - 1; index >= pageIndex; index--) {
                    this._pageViews[index].remove();
                    this._pageViews.pop();
                }
            }
            if (rowPageCount > this._pageViews.length)
                rowPageCount = this._pageViews.length;
            for (let index = 0; index < this._pageViews.length; index++) {
                this._pageViews[index].calculateRect(index, this._settings.isVertical, rowPageCount);
            }
            this._needDraw = true;
            this._updated = false;
            this._calculateSelfRect(rowPageCount);
        }
        this._rowPageCount = rowPageCount;
    }

    draw(parent) {
        if (this._needDraw)
            for (let pageView of this._pageViews) {
                pageView.draw(parent);
            }
        this._needDraw = false;
    }

    get settings() {
        return this._settings;
    }

    get rect() {
        return this._rect;
    }

    get renderData() {
        let res = {
            rect: Rect.Create(this._rect)
        };
        return res;
    }

    get DrawContext() {
        return this._drawContext;
    }

    get Composition() {
        return this._composition;
    }

    get needRender() {
        return this._needDraw;
    }
}

export default TrackView;