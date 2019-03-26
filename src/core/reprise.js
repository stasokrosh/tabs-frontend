import { assert } from './util'

export function validateRepriseCount(count) {
    assert(() => count > 0);
}

class Reprise {
    constructor(props) {
        assert(() => props);
        this.count = props.count;
    }

    static Create(count) {
        return new Reprise(count);
    }

    equal(reprise) {
        return this.count === reprise.count;
    }

    get count() {
        return this._count;
    }

    set count(value) {
        if (value) {
            validateRepriseCount(value);
            this._count = value;
        } else {
            this._count = 0;
        }
    }
}

export default Reprise;