
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
    BACKGROUND_COLOR  : PAGE.COLOR
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
    }
}

export const CHORD = {
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