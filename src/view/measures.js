
export const PAGE = {
    WIDTH : 210,
    HEIGHT : 297,
    PADDING : {
        VERTICAL : 10,
        HORIZONTAL : 10
    },
    INTERVAL : 10,
    TITLE_LINES_COUNT : 2,
    LINES_COUNT : 5
};

export const LINE = {
    PADDING : {
        TOP : 5,
        BOTTOM : 5
    },
    HEIGHT : (PAGE.HEIGHT - PAGE.PADDING.VERTICAL * 2) / PAGE.LINES_COUNT,
    WIDTH : PAGE.WIDTH - 2 * PAGE.PADDING.HORIZONTAL,
    STRING_INTERVAL : 2
};

export const NOTE = {
    HEIGHT : LINE.STRING_INTERVAL,
    WIDTH : 2,
    HORIZONTAL_INTERVAL : 4
};

export function getHeaderHeight() {
    return PAGE.HEIGHT - 2 * PAGE.PADDING.VERTICAL - PAGE.TITLE_LINES_COUNT * LINE.HEIGHT;
}

export function getChordHeight() {
    return LINE.HEIGHT - LINE.PADDING.TOP - LINE.PADDING.BOTTOM;
}