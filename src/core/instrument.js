import { assert } from './util'
import Chord from './chord'

//develop only
export const INSTRUMENT_CODES = {
    GUITAR : 0,
    BASS : 1,
    DRUMS : 2
}

export const INSTRUMENT_GROUPS = {
    GUITAR : 0,
    BASS : 1,
    DRUMS : 2
}

//develop only
const INSTRUMENT_CODE_TO_GROUP = new Map([
    [INSTRUMENT_CODES.GUITAR, INSTRUMENT_GROUPS.GUITAR],
    [INSTRUMENT_CODES.BASS, INSTRUMENT_GROUPS.BASS],
    [INSTRUMENT_CODES.DRUMS, INSTRUMENT_GROUPS.DRUMS]
])

//change in production
export function getInstrumentGroupByCode(code) {
    return INSTRUMENT_CODE_TO_GROUP.get(code);
}

export const INSTRUMENT_VIEWS = {
    GUITAR : 0,
    BASS : 1
}

const INSTRUMENT_GROUPS_TO_VIEWS = new Map([
    [INSTRUMENT_GROUPS.GUITAR, INSTRUMENT_VIEWS.GUITAR],
    [INSTRUMENT_GROUPS.BASS, INSTRUMENT_VIEWS.BASS],
    [INSTRUMENT_GROUPS.DRUMS, INSTRUMENT_VIEWS.GUITAR]
])

export function getInstrumentViewByGroup(group) {
    return INSTRUMENT_GROUPS_TO_VIEWS.get(group);
}

export function getInstrumentViewByCode(code) {
    return getInstrumentViewByGroup(getInstrumentGroupByCode(code));
}

export function getChordGeneratorByInstrumentCode(code) {
    let view = getInstrumentViewByCode(code);
    switch (view) {
        case INSTRUMENT_VIEWS.GUITAR:
            return props => Chord.CreateGuitarChord(props);
        case INSTRUMENT_VIEWS.BASS:
            return props => Chord.CreateBassChord(props);
        default: 
            return props => Chord.Create(props);
    }
}

//develop only
export function validateInstrumentCode(code) {
    assert(() => Object.values(INSTRUMENT_CODES).indexOf(code) !== -1);
}


class Instrument {
    constructor(props) {
        assert(() => props);
        validateInstrumentCode(props.code);
        this._code = props.code;
    }

    static Create(props) {
        return new Instrument(props);
    } 

    getChordGenerator() {
        return getChordGeneratorByInstrumentCode(this._code);
    }

    get code() {
        return this._code;
    }
}

export default Instrument;