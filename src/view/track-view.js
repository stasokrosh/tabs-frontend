import { assert } from '../util'
import Track from './track'
import SVG from 'svg.js'

class TrackView {
    constructor(props) {
        assert(() => props);
        assert(() => props.track instanceof Track);
        this._track = props.track;
        assert(() => props.containerId);
        this.container = SVG(props.containerId);
        this._position = {x: 0, y: 0};
    }

    getClientWindowSize() {
        let x = 0;
        let y = 0;

    }
}

export default TrackView;