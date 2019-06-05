import { assert } from "../util";
import { getTabRequest, updateTabRequest } from "../../../../api/tab-api";
import { getCompositionRequest, sendAddTrackMessage, sendDeleteTrackMessage, sendUpdateTrackMessage } from "../../../../api/tab-edit-api";
import Composition from "../model/composition";

class CompositionProvider {
    constructor(props) {
        assert(() => props);
        assert(() => props.tabId);
        assert(() => props.App);
        this._tabId = props.tabId;
        this._receivers = [];
        this._app = props.App;
        this._tactMap = new Map();
        this._trackMap = new Map();
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
        res = await getCompositionRequest(this.tab.compositionId, this._app.auth.token);
        if (res.success)
            this.setComposition(res.body);
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

    async addTrackRequest(trackData) {
        let res = await sendAddTrackMessage(this.composition.id, this._app.auth.token, trackData);
        if (!res.success)
            return res;
        this.addTrack(res.body);
        return res;
    }

    async updateTrackRequest(trackData) {
        let res = await sendUpdateTrackMessage(this.composition.id, this._app.auth.token, trackData);
        if (!res.success)
            return res;
        this._trackMap.get(trackData.id).copy(trackData);
        return res;
    }

    async deleteTrackRequest(track) {
        let res = await sendDeleteTrackMessage(this.composition.id, this._app.auth.token, track.id);
        if (!res.success)
            return res;
        this.composition.deleteTrack(track);
        return res;
    }

    async updateTabRequest(tab) {
        let res = await updateTabRequest(this.tab.id, this._app.auth.token, tab);
        if (!res.success)
            return res;
        this.tab = res.body;
        return res;
    }

    setComposition(compositionData) {
        this._tactMap.clear();
        this.composition = Composition.Create(compositionData);
        this.composition.id = compositionData.id;
        for (let index = 0; index < compositionData.tacts.length; index++) {
            let tactData = compositionData.tacts[index];
            let tact = this.composition.addTact(tactData);
            tact.id = tactData.id;
            this._tactMap.set(tactData.id, tact);
        }
        for (let trackData of compositionData.tracks) {
            this.addTrack(trackData);
        }
    }

    addTrack(trackData) {
        let track = this.composition.addTrack(trackData);
        track.id = trackData.id;
        this._trackMap.set(trackData.id, track);
        for (let trackTactData of trackData.tacts) {
            let tact = this._tactMap.get(trackTactData.tact);
            let index = this.composition.getTactNum(tact);
            if (index) {
                let trackTact = track.getTact(index - 1);
                trackTact.copy(trackTactData);
                trackTact.id = trackTactData.id;
                this._trackTactMap.set(trackTactData.id, trackTact);
            }
        }
    }
}

export default CompositionProvider;
