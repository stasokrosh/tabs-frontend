import * as Draw from '../draw'

export function renderText(container, text, rect, font, absolutePosition) {
    let x = absolutePosition ? 0 : rect.x;
    let y = (absolutePosition ? 0 : rect.y)  + Draw.getTextYCorrection(rect.height);
    font.size = rect.height;
    container.text(text + '').move(x,y).font(font);
}

export function renderRect(container, rect, color, absolutePosition ) {
    let renderedRect = container.rect(rect.width, rect.height).fill(color);
    if (!absolutePosition) 
        renderedRect.move(rect.x, rect.y);
}

export function renderLine(container, rect, color, width) {
    container.line(rect.x, rect.y, rect.x + rect.width, rect.y + rect.height).stroke({ color, width });
}