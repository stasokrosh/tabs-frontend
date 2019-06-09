import { assert } from "../util";
import { getTabRequest, updateTabRequest } from "../../../../api/tab-api";
import { getCompositionRequest, sendAddTrackMessage, sendDeleteTrackMessage, sendUpdateTrackMessage, sendAddTactMessage, sendUpdateTactMessage, sendUpdateTrackTactMessage } from "../../../../api/tab-edit-api";
import Composition from "../model/composition";

class CompositionProvider {
    constructor(props) {
        assert(() => props);
        assert(() => props.tabId);
        assert(() => props.App);
        assert(() => props.editor);
        this._tabId = props.tabId;
        this._receivers = [];
        this._app = props.App;
        this._tactMap = new Map();
        this._trackMap = new Map();
        this._trackTactMap = new Map();
        this._editor = props.editor;
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
        res = await getCompositionRequest(this.tab.id, this._app.auth.token);
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
        let res = await sendAddTrackMessage(this.tab.id, this._app.auth.token, trackData);
        if (!res.success)
            return res;
        this.addTrack(res.body);
        await this._editor.updateInstruments();
        return res;
    }

    async updateTrackRequest(trackData) {
        let res = await sendUpdateTrackMessage(this.tab.id, this._app.auth.token, trackData);
        if (!res.success)
            return res;
        this._trackMap.get(trackData.id).copy(trackData);
        return res;
    }

    async deleteTrackRequest(track) {
        let res = await sendDeleteTrackMessage(this.tab.id, this._app.auth.token, track.id);
        if (!res.success)
            return res;
        this.composition.deleteTrack(track);
        if (this._editor.selectedTrack === track) {
            this._editor.selectedTrack = this.composition.getTrack(0);
        }
        await this._editor.updateInstruments();
        return res;
    }

    async updateTabRequest(tab) {
        let res = await updateTabRequest(this.tab.id, this._app.auth.token, tab);
        if (!res.success)
            return res;
        this.tab = res.body;
        return res;
    }

    async addTactRequest(tact) {
        let res = await sendAddTactMessage(this.tab.id, this._app.auth.token, convertTact(tact));
        if (!res.success)
            return res;
        tact = this.composition.addTact(tact);
        tact.id = res.body.tact.id;
        this._tactMap.set(tact.id, tact);
        for (let trackTactData of res.body.trackTacts) {
            let track = this._trackMap.get(trackTactData.track);
            let trackTact = track.getTact(track.tactCount - 1);
            trackTact.id = trackTactData.id;
            this._trackTactMap.set(trackTactData.id, trackTact);
        }
        return res;
    }

    async updateTactRequest(tactData) {
        let tact = this._tactMap.get(tactData.id);
        tact.copy(tactData);
        let res = await sendUpdateTactMessage(this.tab.id, this._app.auth.token, tactData);
        return res;
    }

    updateTrackTactRequest(trackTactId) {
        let trackTact = this._trackTactMap.get(trackTactId);
        sendUpdateTrackTactMessage(this.tab.id, this._app.auth.token, convertTrackTact(trackTact));
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
            if (index !== -1) {
                let trackTact = track.getTact(index);
                trackTact.copy(trackTactData);
                trackTact.id = trackTactData.id;
                this._trackTactMap.set(trackTactData.id, trackTact);
            }
        }
    }

    get hasEditRights() {
        return this._app.auth.hasEditRights(this.tab);
    }
}

function convertTact(tact) {
    return {
        duration: {
            count: tact.tactDuration.count,
            fraction: tact.tactDuration.fraction
        },
        reprise: tact.reprise
    }
}

function convertTrackTact(trackTact) {
    return {
        id: trackTact.id,
        chords: trackTact.chords.map(chord => convertChord(chord))
    }
}

function convertChord(chord) {
    return {
        duration: {
            fraction: chord.duration.fraction,
            quaterIs: chord.duration.quater,
            dot: chord.duration.dot,
        },
        isPause: chord.isPause,
        notes: chord.notes.map(note => convertNote(note))
    }
}

function convertNote(note) {
    return {
        index: note.index,
        item: {
            fret: note.item.fret
        }
    }
}


export default CompositionProvider;
