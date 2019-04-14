import { isUndefined } from "util";
import { assert } from "../../util";

class Rect {
    constructor(props) {
        this.init(props);
    }

    static Create(props) {
        return new Rect(props);
    }

    init(props) {
        assert(() => props);
        this.x = isUndefined(props.x) ? 0 : props.x;
        this.y = isUndefined(props.y) ? 0 : props.y;
        this.width = isUndefined(props.width) ? 0 : props.width;
        this.height = isUndefined(props.height) ? 0 : props.height;
    } 
}

export default Rect;