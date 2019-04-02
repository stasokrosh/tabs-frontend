import { assert } from '../util'
import TrackTact from '../model/track-tact'
import Track from '../model/track'
import ChordView from './chord-view'
import Rect from './rect'
import * as Measures from './measures'
import DrawContext from './draw-context'

class TactView {
    constructor(props) {
        assert(() => props);
        assert(() => props.tact instanceof TrackTact);
        this._tact = props.tact;
        assert(() => props.track instanceof Track);
        this._track = props.track;
        assert(() => props.drawContext instanceof DrawContext);
        this._drawContext = props.drawContext;
        this._chordViews = [];
        this._rect = Rect.Create({ height: Measures.LINE.HEIGHT });
        this.refresh();
    }

    static Create(props) {
        return new TactView(props);
    }


    calculateContence() {
        let xPosition = Measures.NOTE.HORIZONTAL_INTERVAL;
        for (let chordView of this._chordViews) {
            chordView.calculateRect(xPosition);
            xPosition += chordView.chordWidth;
        }
        this._rect.width = xPosition;
    }

    draw(parent) {
        let renderRes = this._draw(parent);
        for (let chordView of this._chordViews) {
            chordView.draw(renderRes);
        }
    }

    _draw(parent) {
        return this._drawContext.renderer.renderTact(this, parent);
    }

    refresh() {
        let tactChords = new Set(this._tact.chords);
        let index = 0;
        while (index < this._chordViews.length) {
            let chordView = this._chordViews[index];
            if (!tactChords.has(chordView.chord)) {
                chordView.remove();
                this._chordViews.splice(index, 1);
            } else {
                index++;
            }
        }

        let chordViewMap = new Map();

        for (let chordView of this._chordViews) {
            chordViewMap.set(chordView.chord, chordView);
        }

        this._chordViews.length = 0;
        for (let chord of tactChords) {
            let chordView = chordViewMap.get(chord);
            if (chordView) {
                this._chordViews.push(chordView);
            } else {
                this._chordViews.push(ChordView.Create({
                    chord: chord,
                    drawContext: this._drawContext
                }));
            }
        }
    }

    get tact() {
        return this._tact;
    }

    get rect() {
        return this._rect;
    }

    get index() {
        return this._track.getTactNum(this._tact);
    }

    get drawDuration() {
        let index = this.index;
        if (index === 0) 
            return true;
        let prevTact = this._track.getTact(index - 1);
        return prevTact.tact.tactDuration.equal(this._tact.tact.tactDuration);
    }
}

export default TactView;