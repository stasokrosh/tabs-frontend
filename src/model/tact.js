import { assert } from '../util'
import TactDuration from './tact-duration'

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