import { assert } from '../util'
import TrackTact from '../model/track-tact'
import Track from '../model/track'
import ChordView from './chord-view'
import Rect from './rect'
import * as Measures from './measures'
import DrawContext from './draw-context'

export function getTrackTactHeight(track) {
    return Measures.LINE.STRING_INTERVAL * track.instrument.getStringCount();    
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
        let xPosition = Measures.NOTE.HORIZONTAL_INTERVAL;
        if (this.renderDuration) 
            xPosition += Measures.TACT.DURATION_WIDTH;
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
        return prevTact.tact.tactDuration.equal(this._tact.tact.tactDuration);
    }

    get durationRect() {
        return Rect.Create({
            x : this.rect.x,
            y : Measures.TACT.Y_POS,
            height : getTrackTactHeight(this._track),
            width : Measures.TACT.DURATION_WIDTH
        })
    }

    get renderData() {
        let res = {
            rect : Rect.Create(this._rect)
        };
        if (this.drawDuration)
            res.durationRect = this.durationRect;
        return res;
    }
}

export default TactView;