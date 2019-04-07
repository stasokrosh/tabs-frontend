import SvgRenderer from '../render';
import { assert } from '../../util';
import NoteView from '../note-view';
import ChordView from '../chord-view';
import TactView from '../tact-view';
import LineView from '../line-view';
import PageView from '../page-view';
import EventDispatcher from './event-dispatcher';
import TrackView from '../track-view';

class DrawContext {
    constructor(props) {
        assert(() => props);
        assert(() => props.renderer);
        this._renderer = props.renderer;
        this._eventDispatcher = EventDispatcher.Create();
    }
    
    static Create(props) {
        return DrawContext.CreateSvgDrawContext(props);
    }

    static CreateSvgDrawContext(props) {
        let contextData = {
            renderer : SvgRenderer.Create(props)
        };
        return new DrawContext(contextData);
    }

    renderNote(noteView, parent) {
        assert(() => noteView instanceof NoteView);
        return this._renderer.renderNote(noteView, parent);
    }

    renderChord(chordView, parent) {
        assert(() => chordView instanceof ChordView);
        return this._renderer.renderChord(chordView, parent)
    }

    renderTact(tactView, parent) {
        assert(() => tactView instanceof TactView);
        return this._renderer.renderTact(tactView, parent)
    }

    renderLine(lineView, parent) {
        assert(() => lineView instanceof LineView);
        return this._renderer.renderLine(lineView, parent);
    }

    renderPage(pageView, parent) {
        assert(() => pageView instanceof PageView);
        return this._renderer.renderPage(pageView, parent);
    }

    prepareRender(trackView) {
        assert(() => trackView instanceof TrackView);
        this._renderer.prepareRender(trackView);
    }

    renderTrack(trackView) {
        assert(() => trackView instanceof TrackView);
        this._renderer.renderTrack(trackView);
    }

    addEventListener(listener) {
        this._eventDispatcher.addEventListener(listener);
    }

    removeEventListener(listener) {
        this._eventDispatcher.removeEventListener(listener);
    }

    invokeEvent(event) {
        this._eventDispatcher.invokeEvent(event);
    }
}

export default DrawContext;