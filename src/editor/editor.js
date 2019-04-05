import {assert} from '../util'
import DrawContext from '../view/context/draw-context'
import TrackView from '../view/track-view'

class Editor {
    constructor(props) {
        assert(() => props);
        assert(() => props.containerID);
        this._drawContext = DrawContext.Create({
            containerID : props.containerID
        });
        this._drawContext.addEventListener(this);
        assert(() => props.composition);
        this._composition = props.composition;
        assert(() => props.settings)
        this._settings = props.settings;
        this.selectedTrack = props.composition.getTrack(0);
    }

    static Create(props) {
        return new Editor(props);
    }

    redraw() {
        this._trackView.calculateRect();
        this._drawContext.renderTrack(this._trackView);
    }

    get selectedTrack() {
        return this._selectedTrack;
    }

    set selectedTrack(value) {
        this._selectedTrack = value;
        this._trackView = TrackView.Create({
            track : this._selectedTrack,
            composition : this._composition,
            drawContext : this._drawContext,
            settings : this._settings
        })
    }

    get settings() {
        return this._settings;
    }
}

export default Editor;