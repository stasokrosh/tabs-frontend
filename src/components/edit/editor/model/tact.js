import { assert } from '../util'
import TactDuration from './tact-duration'
import { isUndefined } from 'util';

export const DEFAULT_NO_REPRISE = 0;

export function validateReprise(reprise) {
    assert(() => reprise >= 0);
}

class Tact {
    constructor(props) {
        assert(() => props);
        this.reprise = props.reprise || DEFAULT_NO_REPRISE;
        this.tactDuration = props.tactDuration;
    }

    static Create(props) {
        return new Tact(props);
    }

    copy(tact) {
        if (!isUndefined(tact.reprise))
            this.reprise = tact.reprise;
        if (!isUndefined(tact.tactduration))
            this.tactDuration = tact.tactDuration;
    }

    get tactDuration() {
        return this._tactDuration;
    }

    set tactDuration(value) {
        this._tactDuration = TactDuration.Create(value);
    }

    get reprise() {
        return this._reprise;
    }

    set reprise(value) {
        validateReprise(value);
        this._reprise = value;
    }

}

export default Tact;