import Composition from '../composition'
import {INSTRUMENT_CODES, getChordGeneratorByInstrumentCode} from '../instrument'

it('Composition is created', () => {
    expect(Composition.Create({name : 'test composition'})).toBeDefined();
});

it('Composition is validated', () => {
    expect(Composition.Create()).toThrow();
});

it('Add tracks to composition', () => {
    let composition = composition.Create({name : 'test composition'});
    composition.addTrack({
        name : 'testTrack',
        instrument : {
            code : INSTRUMENT_CODES.GUITAR
        }
    });
    let track = composition.getTrack(0);
    expect(track.name).toBe('test composition');
    composition.deleteTrack(track);
    expect(composition.trackCount).toBe(0);
});

it('Add tacts to composition', () => {
    let composition = composition.Create({name : 'test composition'});
    composition.addTrack({
        name : 'testTrack',
        instrument : {
            code : INSTRUMENT_CODES.GUITAR
        }
    });
    composition.addTact({
        tactDuration : {fraction : 4, count : 4}
    });
    let tact = composition.getTact(0);
    expect(tact.tactDuration.count).toBe(4);
    let trackTact = composition.getTrack(0).getTact(0);
    expect(trackTact.tact).toBe(tact);
});