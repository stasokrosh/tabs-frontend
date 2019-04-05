export const FONT_COEFF = 5 / 8;

export const NOTE_FONT_SIZE = 4;

export const PAGE_NUMBER_FONT_SIZE = 4;

export const TACT_NUMBER_FONT_SIZE = 4;

export const COMPOSITION_NAME_FONT_SIZE = 10;

export const TRACK_NAME_FONT_SIZE = 8;

export const EIGHTS_IN_4_FONT_SIZE = 4;

export const PAGE = {
    WIDTH : 210,
    HEIGHT : 297,
    PADDING : {
        VERTICAL : 10,
        HORIZONTAL : 10
    },
    INTERVAL : 10,
    TITLE_LINES_COUNT : 4,
    LINES_COUNT : 5,
    NUMBER : {
        HEIGHT : PAGE_NUMBER_FONT_SIZE,
        WIDTH : PAGE_NUMBER_FONT_SIZE * FONT_COEFF
    }
};

export const LINE = {
    PADDING : {
        TOP : 5
    },
    HEIGHT : (PAGE.HEIGHT - PAGE.PADDING.VERTICAL * 2) / PAGE.LINES_COUNT,
    WIDTH : PAGE.WIDTH - 2 * PAGE.PADDING.HORIZONTAL,
    STRING_INTERVAL : NOTE_FONT_SIZE
};

export const HEADER = {
    WIDTH : LINE.WIDTH,
    HEIGHT : PAGE.HEIGHT - 2 * PAGE.PADDING.VERTICAL - PAGE.TITLE_LINES_COUNT * LINE.HEIGHT,
    X : PAGE.PADDING.HORIZONTAL,
    Y : PAGE.PADDING.VERTICAL
}

export const COMPOSITION_HEADER = {
    WIDTH : HEADER.WIDTH,
    HEIGHT : COMPOSITION_NAME_FONT_SIZE,
    MARGIN : 10
}

export const TRACK_HEADER = {
    WIDTH : HEADER.WIDTH,
    HEIGHT : TRACK_NAME_FONT_SIZE,
    X : HEADER.X,
    Y : HEADER.Y + COMPOSITION_HEADER.HEIGHT + COMPOSITION_HEADER.MARGIN * 2
}

export const NOTE = {
    HEIGHT : NOTE_FONT_SIZE,
    WIDTH : NOTE_FONT_SIZE * FONT_COEFF,
};

export const CHORD = {
    HORIZONTAL_INTERVAL : NOTE.WIDTH * 2,
    DURATION : {
        HEIGHT : 16,
        EIGHTS_IN_4 : {
            HEIGHT : EIGHTS_IN_4_FONT_SIZE,
            WIDTH : EIGHTS_IN_4_FONT_SIZE * FONT_COEFF
        },
        PADDING : 2,
        FLAG : {
            WIDTH : EIGHTS_IN_4_FONT_SIZE * FONT_COEFF,
            HEIGHT : 0.6,
            INTERVAL : 0.6
        },
        DOT : {
            WIDTH : 0.5,
            HEIGHT : 0.5,
        }
    },
}

export const TACT = {
    Y : LINE.PADDING.TOP + NOTE.HEIGHT / 2,
    NUMBER : {
        WIDTH : TACT_NUMBER_FONT_SIZE * FONT_COEFF,
        HEIGHT : TACT_NUMBER_FONT_SIZE
    },
    DURATION : {
        MARGIN : 2
    },
    REPRISE : {
        WIDTH : 0.6,
        MARGIN : 1
    }
}