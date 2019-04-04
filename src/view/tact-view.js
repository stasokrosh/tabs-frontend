import { assert } from '../util'
import TrackTact from '../model/track-tact'
import Track from '../model/track'
import ChordView from './chord-view'
import Rect from './util/rect'
import * as Measures from './measures'
import DrawContext from './context/draw-context'

export function getTrackTactHeight(track) {
    return Measures.LINE.STRING_INTERVAL * (track.instrument.getStringCount() - 1);    
}

export function getStringRects(width, stringNum) {
    let res = [];;
        let yPos = Measures.TACT.Y;
        for (let index = 0; index < stringNum; index++) {
            res.push(Rect.Create({
                y : yPos,
                width : width,
                height : Measures.STRING.WIDTH
            }));
            yPos += Measures.LINE.STRING_INTERVAL;
        }
        return res;
}

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
        let xPosition = Measures.CHORD.HORIZONTAL_INTERVAL;
        if (this.renderDuration) 
            xPosition += Measures.TACT.DURATION_WIDTH;
        for (let chordView of this._chordViews) {
            chordView.calculateRect(xPosition);
            xPosition += chordView.chordWidth;
        }
        this._rect.width = xPosition;
    }

    optimizeTactWidth(addWidth, xPos) {
        this._rect.x = xPos;
        this._rect.width += addWidth;
        let chordAddWidth = addWidth / this._chordViews.length;
        xPos = 0;
        for (let chordView of this._chordViews) {
            chordView.rect.x = chordView.rect.x + xPos;
            chordView.chordWidth += chordAddWidth;
            xPos += chordAddWidth;
        }
    }

    draw(parent) {
        let renderRes = this._draw(parent);
        for (let chordView of this._chordViews) {
            chordView.draw(renderRes);
        }
    }

    _draw(parent) {
        return this._drawContext.renderTact(this, parent);
    }

    createNewChordView(chord) {
        return ChordView.Create({
            chord: chord,
            drawContext: this._drawContext
        });
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
                this._chordViews.push(this.createNewChordView(chord));
            }
        }
    }

    getStringRects() {
        return getStringRects(this._rect.width, this.track.instrument.getStringCount());
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

    get renderDuration() {
        let index = this.index;
        if (index === 0) 
            return true;
        let prevTact = this._track.getTact(index - 1);
        return !prevTact.tact.tactDuration.equal(this._tact.tact.tactDuration);
    }

    get durationRect() {
        return Rect.Create({
            y : Measures.TACT.Y,
            height : getTrackTactHeight(this._track),
            width : Measures.TACT.DURATION_WIDTH
        })
    }

    get renderData() {
        let res = {
            rect : Rect.Create(this._rect),
            getStringRects : this.getStringRects.bind(this)
        };
        if (this.renderDuration)
            res.durationRect = this.durationRect;
        return res;
    }

    get DrawContext() {
        return this._drawContext;
    }
}

export default TactView;