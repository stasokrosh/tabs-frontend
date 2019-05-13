import { assert } from "../../util";
import ChordView from "../chord-view";
import { renderRect, renderText, renderLine } from './util'
import * as Draw from './draw'
import { EditorEvent } from "../../editor-event";
import { getPublicImageUrl } from "../../../../../util";

class ChordSvgRenderer {
    constructor(props) {
        assert(() => props);
    }

    static Create(props) {
        return new ChordSvgRenderer(props);
    }

    render(chordView, renderInfo, container) {
        assert(() => chordView instanceof ChordView && renderInfo && container);
        this.renderSelection(chordView, renderInfo.rect, container);
        this.renderSpace(chordView, renderInfo.spaceRect, container);
        this.renderDuration(chordView, renderInfo.durationData, container);
        if (chordView.chord.isPause)
            this.renderPause(chordView, renderInfo, container);
    }

    renderSelection(chordView, rect, container) {
        let color = container.selectionColor ? null : (chordView.chord.selected ? Draw.CHORD.BACKGROUND_COLOR_SELECTED : Draw.CHORD.BACKGROUND_COLOR);
        let selection = renderRect(container, rect, color, true);
        selection.click((e) => {
            chordView.drawContext.invokeEvent(EditorEvent.CreateSelectChordEvent({
                object : {
                    chord : chordView.chord
                }
            }));
            e.stopPropagation();
            e.preventDefault();
        });
        if (chordView.chord.selected)
            container.selectionColor = Draw.CHORD.BACKGROUND_COLOR_SELECTED;
    }

    renderPause(chordView, renderInfo, container) {
        container.image(getPublicImageUrl('pause.png')).size(renderInfo.rect.width, renderInfo.rect.height);
    }

    renderDuration(chordView, durationData, container) {
        if (durationData.quaterIsRect) {
            renderText(container, chordView.chord.duration.quaterIs, durationData.quaterIsRect, {
                fill: Draw.CHORD.DURATION.COLOR, family: Draw.CHORD.DURATION.QUATER_IS.FONT
            });
        }
        if (durationData.fractionLine) {
            renderLine(container, durationData.fractionLine, Draw.CHORD.DURATION.COLOR, Draw.LINE.WIDTH);
        }
        if (durationData.flagRects) {
            for (let flagRect of durationData.flagRects) {
                renderRect(container, flagRect, Draw.CHORD.DURATION.COLOR);
            }
        }
        if (durationData.dotRect) {
            renderRect(container, durationData.dotRect, Draw.CHORD.DURATION.COLOR);
        }
    }

    renderSpace(chordView, rect, container) {
        let space = renderRect(container, rect);
        space.click((e) => {
            chordView.drawContext.invokeEvent(EditorEvent.CreateAddChordEvent({
                object : {
                    tact : chordView.parent.tact,
                    index : chordView.index + 1
                }
            }));
            e.stopPropagation();
            e.preventDefault();
        })
    }
}

export default ChordSvgRenderer;