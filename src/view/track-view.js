import { assert } from '../util'
import Track from '../model/track'
import TactView from './tact-view'
import DrawContext from './draw-context'
import * as Measures from './measures'
import LineView from './line-view';
import PageView from './page-view';

class TrackView {
    constructor(props) {
        assert(() => props);
        assert(() => props.track instanceof Track);
        this._track = props.track;
        assert(() => props.drawContext instanceof DrawContext);
        this._drawContext = props.drawContext;
        assert(() => props.settings);
        this._settings = props.settings;
        this._tactViews = [];
        this._pageViews = [];
        this.refresh();
    }

    static Create(props) {
        return new TrackView(props);
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
                this._tactViews.push(TactView.Create({
                    tact: tact,
                    track: this._track,
                    drawContext: this._drawContext
                }));
        }
    }

    calculateStructure() {
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
                line : currentLine,
                optimize : false
            });
        let globalLineIndex = 0;
        let pageIndex = 0;
        while (globalLineIndex < lines.length) {
            let pageView = this._pageViews[pageIndex];
            if (!pageView) {
                pageView = PageView.Create({
                    drawContext: this._drawContext,
                    track: this._track
                });
                this._pageViews.push(pageView);
            }
            let linesCount = pageIndex === 0 ? Measures.PAGE.TITLE_LINES_COUNT : Measures.PAGE.LINES_COUNT;
            let lineIndex = 0;
            while (lineIndex < linesCount && globalLineIndex < lines.length) {
                let lineView = pageView.getLineView(lineIndex);
                if (!lineView) {
                    lineView = LineView.Create({
                        drawContext: this._drawContext,
                    });
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
            pageView.calculateRect(pageIndex, this._settings.isVertical);
            pageIndex++;
        }
        if (pageIndex < this._pageViews.length) {
            for (let index = this._pageViews.length - 1; index >= pageIndex; index--) {
                this._pageViews[index].remove();
                this._pageViews.pop();
            }
        }
    }

    draw(parent) {
        for (let pageView of this._pageViews) {
            pageView.draw(parent);
        }
    }

    get settings() {
        return this._settings;
    }
}

export default TrackView;