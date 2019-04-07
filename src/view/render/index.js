import { assert } from '../../util'
import SVG from 'svg.js';
import NoteSvgRenderer from './render-note';
import ChordSvgRenderer from './render-chord';
import TactSvgRenderer from './render-tact';
import LineSvgRenderer from './render-line';
import PageSvgRenderer from './render-page';
import Rect from '../util/rect';

class SvgRenderer {
    constructor(props) {
        assert(() => props);
        assert(() => props.containerID);
        this._svgContainer = SVG(props.containerID);
        this._container = document.getElementById(props.containerID);
        assert(() => props.workspaceID);
        this._workspace = document.getElementById(props.workspaceID);
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

    prepareRender(trackView) {
        let zoom = trackView.settings.zoom;
        let availableRect = Rect.Create({
            width : this._workspace.clientWidth / zoom,
            height : this._workspace.clientHeight / zoom
        });
        trackView.calculateRect(availableRect);
    }

    renderTrack(trackView) {
        let renderInfo = trackView.renderData;
        let containerRect = this.getContainerRect(trackView);
        this._container.style.width = containerRect.width + 'px';
        this._container.style.height = containerRect.height + 'px';
        if (trackView.needRender)
            this._svgContainer.viewbox(0,0, renderInfo.rect.width, renderInfo.rect.height);
        trackView.draw(this._svgContainer);
    }

    getContainerRect(trackView) {
        let zoom = trackView.settings.zoom;
        return Rect.Create({
            width : trackView.rect.width * zoom,
            height : trackView.rect.height * zoom
        })
    }
}

export default SvgRenderer;