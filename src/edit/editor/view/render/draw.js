
export const LINE = {
    WIDTH : 0.3,
    COLOR : '#000'
}

export const PAGE = {
    COLOR : '#fff',
    NUMBER : {
        COLOR : '#000',
        FONT : 'Helvetica'
    },
    HEADER : {
        FONT : 'Helvetica',
        COLOR : '#000'
    }
}

export const NOTE = {
    COLOR : '#000',
    FONT : 'Helvetica',
    BACKGROUND_COLOR  : PAGE.COLOR,
    BACKGROUND_COLOR_SELECTED : '#ff0'
}

export const TACT = {
    NUMBER : {
        COLOR : '#000',
        FONT : 'Helvetica'
    },
    DURATION : {
        COLOR : '#000',
        FONT : 'Helvetica',
        BACKGROUND_COLOR  : PAGE.COLOR
    },
    REPRISE : {
        COLOR : '#000'
    },
    BACKGROUND_COLOR_SELECTED : '#ff0',
    BACKGROUND_COLOR : null
}

export const CHORD = {
    BACKGROUND_COLOR_SELECTED : '#ff0',
    BACKGROUND_COLOR : null,
    DURATION : {
        COLOR : "#000",
        QUATER_IS : {
            FONT : 'Helvetica'
        }
    }
}

export function getTextYCorrection(height) {
    return 19 / height;
}