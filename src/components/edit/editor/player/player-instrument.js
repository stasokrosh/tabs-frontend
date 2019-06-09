import { assert } from "../util"
import Tone from 'tone'
import { INSTRUMENT_CODES, getStringCountByInstrumentCode, getInstrumentViewByCode } from "../model/instrument";
import { getBaseNotesByInstrumentView, getNoteByNoteNum, getSamplePath, getNotes } from "./util";

const SYNTH_FOR_INSTRUMENT = new Map([
    [INSTRUMENT_CODES.GUITAR, Tone.Synth],
    [INSTRUMENT_CODES.BASS, Tone.Synth],
    [INSTRUMENT_CODES.KEYS, Tone.Synth]
]);

export default async function getInstrumentPlayer(instrumentCode, volume) {
    switch (instrumentCode) {
        case INSTRUMENT_CODES.GUITAR:
        case INSTRUMENT_CODES.KEYS: 
            return await SampleGuitarPlayer.Create({
                volume : volume,
                instrumentCode : instrumentCode
            });
        default:
            return SynthInstrumentPlayer.Create({
                voicesCount: getStringCountByInstrumentCode(instrumentCode),
                synth: SYNTH_FOR_INSTRUMENT.get(instrumentCode),
                instrumentView: getInstrumentViewByCode(instrumentCode),
                volume: volume
            })
    }

} 

class SynthInstrumentPlayer {
    constructor(props) {
        assert(() => props);
        assert(() => props.voicesCount);
        assert(() => props.synth);
        this._synth = new Tone.PolySynth(props.voicesCount, props.synth).toMaster();
        this._instrumentView = props.instrumentView;
        this._synth.volume.value = props.volume;
    }

    static Create(props) {
        return new SynthInstrumentPlayer(props);
    }

    set volume(value) {
        this._synth.volume.value = value;
    }

    play(chord, time) {
        if (!chord.isPause) {
            let notes = getNotes(chord, this._instrumentView);
            this._synth.triggerAttackRelease(notes, time);
        }
    }    
}

class SampleGuitarPlayer {
    static async Create(props) {
        let guitarPlayer = new SampleGuitarPlayer();
        await guitarPlayer.init(props);
        return guitarPlayer;
    }

    async init(props) {
        this._sampler = await this._getSampler(props.instrumentCode);
        this.volume = props.volume;
        this._instrumentCode = props.instrumentCode;
    }

    getBaseNotes(instrumentCode) {
        return getBaseNotesByInstrumentView(getInstrumentViewByCode(instrumentCode));
    }

    async _getSampler(instrumentCode) {
        let baseNotes = this.getBaseNotes(instrumentCode);
        let desc = {};
        for (let baseNote of baseNotes) {
            for (let index = 0; index < 20; index++) {
                let note = getNoteByNoteNum(baseNote + index);
                desc[note] = getSamplePath(note, instrumentCode);
            }
        }
        return await new Tone.Sampler(desc).toMaster();
    }

    set volume(value) {
        this._sampler.volume.value = value;
    }

    play(chord, time) {
        if (!chord.isPause) {
            let notes = getNotes(chord, getInstrumentViewByCode(this._instrumentCode));
            this._sampler.triggerAttackRelease(notes, time);
        }
    }
}