import { assert } from './util'
import Reprise from './reprise'
import TactDuration from './tact-duration'

class Tact {
    constructor(props) {
        assert(() => props);
        this.reprise = props.reprise;
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
        this._reprise = value ? Reprise.Create(value) : value;
    }

}

export default Tact;