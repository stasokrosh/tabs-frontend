import { assert } from "../util";
import { getTabRequest } from "../../../../api/tab-api";
import { getCompositionRequest } from "../../../../api/tab-edit-api";
import Composition from "../model/composition";

class CompositionProvider {
    constructor(props) {
        assert(() => props);
        assert(() => props.tabId);
        assert(() => props.App);
        this._tabId = props.tabId;
        this._receivers = [];
        this._app = props.App;
        this._trackMap = new Map();
        this._tactMap = new Map();
        this._trackTactMap = new Map();
    }

    static Create(props) {
        return new CompositionProvider(props);
    }

    async init() {
        let res = await this.reload();
        return res;
    }

    async reload() {
        let res = await getTabRequest(this._tabId, this._app.auth.token);
        if (!res.success)
            return res;
        this.tab = res.body;
        res = await getCompositionRequest(this._tabId, this._app.auth.token);
        if (res.success)
            this.composition = this.parseCompositionData(res.body);
        return res;
    }

    async subscribe() {

    }

    async unsubscribe() {

    }

    receiveCompositionMessages(receiver) {
        this._receivers.push(receiver);
    }

    onMessage(message) {

        for (let receiver of this._receivers) {
            receiver.receiveMessage(message);
        }
    }

    parseCompositionData(compositionData) {
        this._trackMap.clear();
        this._tactMap.clear();
        this._trackTactMap.clear();
        let tactInvMap = new Map();
        let composition = Composition.Create(compositionData);
        for (let index = 0; index < compositionData.tacts.length; index++) {
            let tactData = compositionData.tacts[index];
            let tact = composition.addTact(tactData);
            this._tactMap.set(tact, tactData.id);
            tactInvMap.set(tactData.id, index + 1);
        }
        for (let trackData of compositionData.tracks) {
            let track = composition.addTrack(trackData);
            this._trackMap.set(track, trackData.id);
            for (let trackTactData of trackData.tacts) {
                let index = tactInvMap[trackTactData.tact];
                if (index) {
                    let trackTact = track.getTact(index - 1);
                    this._trackTactMap.set(trackTact, trackTactData.id);
                    trackTact.copy(trackTactData);
                }
            }
        }
        return composition;
    }
}

export default CompositionProvider;
