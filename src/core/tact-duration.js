import { assert } from './util'
import { validateFraction } from './duration'

export function validateTactDurationCount(count, fraction) {
    assert(() => count >= 1 && count <= fraction);
}

class TactDuration {
    constructor(props) {
        assert(() => props);
        this.fraction = props.fraction;
        this.count = props.count;
    }

    static Create(props) {
        return new TactDuration(props);
    }

    get fraction() {
        return this._fraction;
    }

    set fraction(value) {
        validateFraction(value);
        this._fraction = value;
    }

    get count() {
        return this._count;
    }

    set count(value) {
        validateTactDurationCount(value, this.fraction);
        this._count = value;
    }
}

export default TactDuration;