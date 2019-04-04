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
        this._containerID = props.containerID;
        this._noteRenderer = NoteSvgRenderer.Create({});
        this._chordRenderer = ChordSvgRenderer.Create({});
        this._tactRenderer = TactSvgRenderer.Create({});
        this._lineRenderer = LineSvgRenderer.Create({});
        this._pageRenderer = PageSvgRenderer.Create({});
    }

    static Create(props) {
        return new SvgRenderer(props);
    }

    clear() {
        this._container.remove();
        this._container = SVG(this._containerID);
    }

    renderNote(noteView, parent) {
        let renderInfo = noteView.renderData;
        let container = parent.nested();
        container.move(renderInfo.rect.x, renderInfo.rect.y);
        this._noteRenderer.render(noteView, renderInfo, container);
        return container;
    }

    renderChord(chordView, parent) {
        let renderInfo = chordView.renderData;
        let container = parent.nested();
        container.move(renderInfo.rect.x, renderInfo.rect.y);
        this._chordRenderer.render(chordView, renderInfo, container);
        return container;
    }

    renderTact(tactView, parent) {
        let renderInfo = tactView.renderData;
        let container = parent.nested();
        container.move(renderInfo.rect.x, renderInfo.rect.y);
        this._tactRenderer.render(tactView, renderInfo, container);
        return container;
    }

    renderLine(lineView, parent) {
        let renderInfo = lineView.renderData;
        let container = parent.nested();
        container.move(renderInfo.rect.x, renderInfo.rect.y);
        this._lineRenderer.render(lineView, renderInfo, container);
        return container;
    }

    renderPage(pageView, parent) {
        let renderInfo = pageView.renderData;
        let container = parent.nested();
        container.move(renderInfo.rect.x, renderInfo.rect.y);
        this._pageRenderer.render(pageView, renderInfo, container);
        return container;
    }

    renderTrack(trackView) {
        let renderInfo = trackView.renderData;
        this._container.clear();
        let bbox = this._container.rbox();
        if (trackView.settings.isVertical) {
            this._container.height(bbox.width * renderInfo.rect.height / renderInfo.rect.width);
        } else {
            this._container.width(bbox.height * renderInfo.rect.width / renderInfo.rect.height);
        }
        this._container.viewbox(0,0, renderInfo.rect.width, renderInfo.rect.height);
        trackView.draw(this._container);
    }
}

export default SvgRenderer;