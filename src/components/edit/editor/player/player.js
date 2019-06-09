import { assert } from "../util";
import Tone from 'tone'
import { convertTactDurationToTime, convertDurationToTime } from "./util";
import { EditorEvent } from "../editor-event";
import getInstrumentPlayer from "./player-instrument";

const DEFAULT_VOLUME = 500;

function convertVolumeToTone(volume) {
    return 10 * Math.log10(Math.pow(10, volume / 1000));
}

function getTactIndexArray(composition, startIndex) {
    let res = [];
    let currentTactIndex = startIndex;
    let lastRepriseIndex = 0;
    for (let i = startIndex; i >= 0; i--) {
        let tact = composition.getTact(i);
        if (tact.reprise) {
            lastRepriseIndex = i;
            break;
        }
    }
    let isRepeat = false;
    let repriseCount = 0;
    while (currentTactIndex < composition.tactCount) {
        let tact = composition.getTact(currentTactIndex);
        res.push(currentTactIndex);
        if (!tact.reprise) {
            currentTactIndex++;
        } else {
            if (isRepeat) {
                repriseCount--;
            } else {
                repriseCount = tact.reprise;
                isRepeat = true;
            }
            if (repriseCount === 1) {
                lastRepriseIndex = currentTactIndex;
                isRepeat = false;
                currentTactIndex++;
            } else {
                currentTactIndex = lastRepriseIndex;
            }
        }
    }
    return res;
}

class Player {
    constructor(props) {
        assert(() => props);
        assert(() => props.editor)
        this._editor = props.editor;
        this.isPlaying = false;
        this._instrumentMap = new Map();
        this._instruments = [];
        this._volume = DEFAULT_VOLUME;
    }

    static Create(props) {
        return new Player(props);
    }

    get volume() {
        return this._volume;
    }

    set volume(value) {
        this._volume = value;
        for (let instrument of this._instruments) {
            instrument.volume = convertVolumeToTone(this._volume);
        }
    }

    play(fromTact) {
        this.isPlaying = true;
        let startTactIndex = fromTact ? this._editor.composition.getTactNum(fromTact.tact) : 0;
        let tactIndexArray = getTactIndexArray(this._editor.composition, startTactIndex);
        this.schedulePlaying(tactIndexArray);
        Tone.Transport.toggle();
    }

    async updateInstruments() {
        await this.getInstruments(this._editor.composition.tracks);
    }

    async getInstruments(tracks) {
        this._instrumentMap.clear();
        this._instruments.length = 0;
        for (let track of tracks) {
            let instrumentPlayer = await getInstrumentPlayer(track.instrument.code, convertVolumeToTone(this._volume));
            this._instrumentMap.set(track, instrumentPlayer);
            this._instruments.push(instrumentPlayer);
        }
    }

    schedulePlaying(tactIndexArray) {
        Tone.Transport.cancel();
        let composition = this._editor.composition;
        let allTime = 0;
        for (let tactIndex of tactIndexArray) {
            let tact = composition.getTact(tactIndex);
            for (let track of composition.tracks) {
                let tactTime = 0;
                let trackTact = track.getTact(tactIndex);
                for (let chord of trackTact.chords) {
                    let chordTime = convertDurationToTime(chord.duration);
                    Tone.Transport.schedule(this.createPlayChordCallback(chord, chordTime, track), allTime + tactTime);
                    tactTime += chordTime;
                }
            }
            allTime += convertTactDurationToTime(tact.tactDuration);
        }
        Tone.Transport.schedule(this.stopCallback.bind(this), allTime)
    }

    createPlayChordCallback(chord, chordTime, track) {
        return (time) => {
            this.playChordCallback(time, chord, chordTime, track);
        }
    }

    playChordCallback(time, chord, chordTime, track) {
        if (this._editor.selectedTrack === track) {
            this._editor.drawContext.invokeEvent(EditorEvent.CreateSelectChordEvent({
                object: {
                    chord: chord
                }
            }));
        }
        let instrumentPlayer = this._instrumentMap.get(track);
        instrumentPlayer.play(chord, chordTime);
    }

    stopCallback() {
        this._editor.drawContext.invokeEvent(EditorEvent.CreateStopEvent({}));
    }

    stop() {
        Tone.Transport.toggle();
        this.isPlaying = false;
    }
}

export default Player;