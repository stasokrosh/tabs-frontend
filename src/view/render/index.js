import { assert } from '../../util'
import SVG from 'svg.js';
import NoteSvgRenderer from './render-note';
import ChordSvgRenderer from './render-chord';
import TactSvgRenderer from './render-tact';
import LineSvgRenderer from './render-line';
import PageSvgRenderer from './render-page';

class SvgRenderer {
    constructor(props) {
        assert(() => props.containerID);
        this._container = SVG(props.containerID);
        this._noteRenderer = NoteSvgRenderer.Create({});
        this._chordRenderer = ChordSvgRenderer.Create({});
        this._tactRenderer = TactSvgRenderer.Create({});
        this._lineRenderer = LineSvgRenderer.Create({});
        this._pageRenderer = PageSvgRenderer.Create({});
    }

    static Create(props) {
        return new SvgRenderer(props);
    }

    renderNote(noteView, renderInfo, parent) {
        let container = parent.nested();
        container.move(renderInfo.rect.x, renderInfo.rect.y);
        this._noteRenderer.render(noteView, renderInfo, container);
        return container;
    }

    renderChord(chordView, renderInfo, parent) {
        let container = parent.nested();
        container.move(renderInfo.rect.x, renderInfo.rect.y);
        this._chordRenderer.render(chordView, renderInfo, container);
        return container;
    }

    renderTact(tactView, renderInfo, parent) {
        let container = parent.nested();
        container.move(renderInfo.rect.x, renderInfo.rect.y);
        this._tactRenderer.render(tactView, renderInfo, container);
        return container;
    }

    renderLine(lineView, renderInfo, parent) {
        let container = parent.nested();
        container.move(renderInfo.rect.x, renderInfo.rect.y);
        this._lineRenderer.render(lineView, renderInfo, container);
        return container;
    }

    renderPage(pageView, renderInfo, parent) {
        let container = parent.nested();
        container.move(renderInfo.rect.x, renderInfo.rect.y);
        this._pageRenderer.render(pageView, renderInfo, container);
        return container;
    }

    renderTrack(trackView) {
        this._container.clear();
        trackView.draw(this._container);
    }
}

export default SvgRenderer;