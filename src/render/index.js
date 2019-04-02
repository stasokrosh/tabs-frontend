import {assert} from '../util'
import Rect from '../view/rect';
import NoteView from '../view/note-view';
import ChordView from '../view/chord-view';
import TactView from '../view/tact-view';
import LineView from '../view/line-view';
import PageView from '../view/page-view';
import SVG from 'svg.js';
import NoteSvgRenderer from './render-note';
import ChordSvgRenderer from './render-chord';
import TactSvgRenderer from './render-tact';
import LineSvgRenderer from './render-line';
import PageSvgRenderer from './render-page';

export const DEFAULT_ZOOM = 2;
export const ZOOM_CHANGE_SPEED = 0.1;

function getZoomed(value, zoom) {
    return value * zoom;
}

function getZoomedRect(rect, zoom) {
    return Rect.Create({
        x : getZoomed(rect.x, zoom),
        y : getZoomed(rect.y, zoom),
        width : getZoomed(rect.width, zoom),
        height : getZoomed(rect.height, zoom)
    })
}

class SvgRenderer {
    constructor(props) {
        assert(() => props.containerID);
        this._container = SVG(props.containerID);
        this._zoom = DEFAULT_ZOOM;
        this._noteRenderer = NoteSvgRenderer.Create({});
        this._chordRenderer = ChordSvgRenderer.Create({});
        this._tactRenderer = TactSvgRenderer.Create({});
        this._lineRenderer = LineSvgRenderer.Create({});
        this._pageRenderer = PageSvgRenderer.Create({});
    }

    static Create(props) {
        return new SvgRenderer(props);
    }

    renderNote(noteView, parent) {
        assert(() => noteView instanceof NoteView);
        let rect = getZoomedRect(noteView.rect, this._zoom);
        let container = parent.nested();
        container.move(rect.x, rect.y);
        this._noteRenderer.render(noteView.note, rect, container);
        return container;
    }

    renderChord(chordView, parent) {
        assert(() => chordView instanceof ChordView);
        let rect = getZoomedRect(chordView.rect, this._zoom);
        let container = parent.nested();
        container.move(rect.x, rect.y);
        this._chordRenderer.render(chordView.chord, rect, container);
        return container;
    }

    renderTact(tactView, parent) {
        assert(() => tactView instanceof TactView);
        let rect = getZoomedRect(tactView.rect, this._zoom);
        let container = parent.nested();
        container.move(rect.x, rect.y);
        this._tactRenderer.render(tactView.tact, tactView.index, tactView.drawDuration, rect, container);
        return container;
    }

    renderLine(lineView, parent) {
        assert(() => lineView instanceof LineView);
        let rect = getZoomedRect(lineView.rect, this._zoom);
        let container = parent.nested();
        container.move(rect.x, rect.y);
        this._lineRenderer.render(lineView.stringsRectInfo, rect, container);
        return container;
    }

    renderPage(pageView, parent) {
        assert(() => pageView instanceof PageView);
        let rect = getZoomedRect(pageView.rect, this._zoom);
        let container = parent.nested();
        container.move(rect.x, rect.y);
        this._pageRenderer.render(pageView.index, pageView.track, rect, container);
        return container;
    }

    renderTrack(trackView) {
        this._container.clear();
        trackView.draw(this._container);
    }

    get zoom() {
        return this._zoom;
    }

    set zoom(value) {
        assert(() => value);
        this._zoom = value;
    }

    zoomIn() {
        this._zoom += ZOOM_CHANGE_SPEED;
    }

    zoomOut() {
        if (this._zoom - ZOOM_CHANGE_SPEED > 0)
            this._zoom -= ZOOM_CHANGE_SPEED;
    }

    get container() {
        return this._container;
    }
}

export default SvgRenderer;