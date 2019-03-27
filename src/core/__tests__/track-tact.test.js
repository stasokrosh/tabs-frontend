import TrackTact from '../track-tact'
import Tact from '../tact'
import { INSTRUMENT_CODES, getChordGeneratorByInstrumentCode } from '../instrument'
import TactDuration from '../tact-duration';

it('Track tact is created', () => {
    let tact = Tact.Create({ tactDuration: TactDuration.Create({ fraction: 4, count: 4 }) });
    let chordGenerator = getChordGeneratorByInstrumentCode(INSTRUMENT_CODES.GUITAR);
    expect(TrackTact.Create({ tact, chordGenerator })).toBeDefined();
});

it('Track tact is validated', () => {
    expect(() => TrackTact.Create()).toThrow();
    expect(() => TrackTact.Create({})).toThrow();
});

it('Set and get chords', () => {
    let tact = Tact.Create({ tactDuration: TactDuration.Create({ fraction: 4, count: 4 }) });
    let chordGenerator = getChordGeneratorByInstrumentCode(INSTRUMENT_CODES.GUITAR);
    let trackTact = TrackTact.Create({ tact, chordGenerator });
    let note = {
        duration: { fraction: 1 },
        fret: 3
    };
    trackTact.addChord({
        notes: [{ index: 0, item: note }]
    });
    note = {
        duration: { fraction: 1 },
        fret: 4
    };
    trackTact.addChord({
        notes: [{ index: 0, item: note }]
    }, 0);
    let chord = trackTact.getChord(0)
    expect(chord.getNote(0).fret).toBe(4);
    expect(trackTact.getChord(1).getNote(0).fret).toBe(3);
    trackTact.deleteChord(chord);
    expect(trackTact.chordCount).toBe(1);
})