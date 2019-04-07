import {assert} from '../util'
import DrawContext from '../view/context/draw-context'
import TrackView from '../view/track-view'

class Editor {
    constructor(props) {
        assert(() => props);
        assert(() => props.containerID);
        this._drawContext = DrawContext.Create({
            containerID : props.containerID,
            workspaceID : props.workspaceID
        });
        this._drawContext.addEventListener(this);
        assert(() => props.composition);
        this._composition = props.composition;
        this._settings = { 
            isVertical : true,
            zoom : 3,
            wrapPages : true
        };
        this.selectedTrack = props.composition.getTrack(0);
    }

    static Create(props) {
        return new Editor(props);
    }

    redraw() {
        this._drawContext.renderTrack(this._trackView);
    }

    prepare() {
        this._drawContext.prepareRender(this._trackView);
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