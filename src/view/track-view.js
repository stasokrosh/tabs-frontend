import { assert } from '../util'
import Track from './track'
import SVG from 'svg.js'

class TrackView {
    constructor(props) {
        assert(() => props);
        assert(() => props.track instanceof Track);
        this._track = props.track;
        assert(() => props.containerId);
        this._container = SVG(props.containerId);
        this._position = 0;
        
        this._pages = [];
        this._lines = [];
    }

    getClientWindowSize() {
        let x = 0;
        let y = 0;
    }
}

export default TrackView;