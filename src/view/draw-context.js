import SvgRenderer from './render';
import { assert } from '../util';
import Rect from './rect';
import NoteView from '../view/note-view';
import ChordView from '../view/chord-view';
import TactView from '../view/tact-view';
import LineView from '../view/line-view';
import PageView from '../view/page-view';

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

class DrawContext {
    constructor(props) {
        assert(() => props);
        assert(() => props.renderer);
        this._renderer = props.renderer;
        this._zoom = props.zoom || DEFAULT_ZOOM;
    }
    
    static CreateSvgDrawContext(props) {
        let contextData = {
            renderer : SvgRenderer.Create(props)
        };
        return new DrawContext(contextData);
    }

    renderNote(noteView, parent) {
        assert(() => noteView instanceof NoteView);
        let renderData = noteView.renderData;
        renderData.rect.init(this.getZoomedRect(renderData.rect));
        return this._renderer.renderNote(noteView, renderData, parent);
    }

    renderChord(chordView, parent) {
        assert(() => chordView instanceof ChordView);
        let renderData = chordView.renderData;
        renderData.rect.init(this.getZoomedRect(renderData.rect));
        renderData.durationRect.init(this.getZoomedRect(renderData.durationRect));
        return this._renderer.renderChord(chordView, renderData, parent)
    }

    renderTact(tactView, parent) {
        assert(() => tactView instanceof TactView);
        let renderData = tactView.renderData;
        renderData.rect.init(this.getZoomedRect(renderData.rect));
        if (renderData.durationRect) {
            renderData.durationRect.init(this.getZoomedRect(renderData.durationRect));
        }
        return this._renderer.renderTact(tactView, renderData, parent)
    }

    renderLine(lineView, parent) {
        assert(() => lineView instanceof LineView);
        let renderData = lineView.renderData;
        renderData.rect.init(this.getZoomedRect(renderData.rect));
        for (let stringRect of renderData.stringRects) {
            stringRect.init(this.getZoomedRect(stringRect));
        }
        return this._renderer.renderLine(lineView, renderData, parent);
    }

    renderPage(pageView, parent) {
        assert(() => pageView instanceof PageView);
        let renderData = pageView.renderData;
        renderData.rect.init(this.getZoomedRect(renderData.rect));
        renderData.numberRect.init(this.getZoomedRect(renderData.numberRect));
        if (renderData.headerRect) {
            renderData.headerRect.init(this.getZoomedRect(renderData.headerRect));
        }
        return this._renderer.renderPage(pageView, renderData, parent);
    }

    renderTrack(trackView) {
        this._renderer.renderTrack(trackView);
    }

    getZoomedRect(rect) {
        return getZoomedRect(rect, this._zoom);
    }

    getZoomed(value) {
        return getZoomed(value, this._zoom);
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
}

export default DrawContext;