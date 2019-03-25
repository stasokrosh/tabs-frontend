import { assert } from './util'

export const DURATION_FRACTIONS = [1, 2, 4, 8, 16, 32];
export const EIGHTS_IN_QUATER = [2, 3, 5, 7];
export const DEFAULT_EIGHT_IN_QUATER_COUNT = 2;

export function validateFraction(fraction) {
    assert(() => DURATION_FRACTIONS.indexOf(fraction) !== -1);
}

export function validateQuaterIs(quaterIs) {
    assert(() => EIGHTS_IN_QUATER.indexOf(quaterIs) !== -1);
}

class Duration {
    constructor(props) {
        assert(() => props);
        this.fraction = props.fraction;
        this.quaterIs = props.quaterIs || DEFAULT_EIGHT_IN_QUATER_COUNT;
        this.dot = props.dot;
    }

    static Create(props) {
        return new Duration(props);
    }

    equal(duration) {
        return this.fraction === duration.fraction &&
            this.quaterIs === duration.quaterIs &&
            this.dot == duration.dot;
    }

    get fraction() {
        return this._fraction;
    }

    set fraction(value) {
        validateFraction(value);
        this._fraction = value;
    }

    get quaterIs() {
        return this._quaterIs;
    }

    set quaterIs(value) {
        validateQuaterIs(value);
        this._quaterIs = value;
    }
}

export default Duration;