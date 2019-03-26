import TrackTact from '../track-tact'
import Tact from '../tact'
import {INSTRUMENT_CODES, getChordGeneratorByInstrumentCode} from '../instrument'
import TactDuration from '../tact-duration';

it('Track tact is created', () => {
    let tact = Tact.Create({tactDuration : TactDuration.Create({fraction : 4, count : 4})});
    let chordGenerator = getChordGeneratorByInstrumentCode(INSTRUMENT_CODES.GUITAR);
    expect(TrackTact.Create({tact, chordGenerator})).toBeDefined();
});