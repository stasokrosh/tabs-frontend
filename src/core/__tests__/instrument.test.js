import Instrument, { INSTRUMENT_CODES } from '../instrument';
import { DEFAULT_STRING_COUNTS } from '../chord'

it('Instrument is created', () => {
    expect(Instrument.Create({ code: INSTRUMENT_CODES.GUITAR })).toBeDefined();
});

it('Instrument is validated', () => {
    expect(() => Instrument.Create({ code: -1 })).toThrow();
});

it('Instrument produces chord generators', () => {
    let instrument = Instrument.Create({ code: INSTRUMENT_CODES.GUITAR });
    expect(instrument.getChordGenerator()({ duration: { fraction: 4 } }).stringNum).toBe(DEFAULT_STRING_COUNTS.GUITAR);
    instrument = Instrument.Create({ code: INSTRUMENT_CODES.BASS });
    expect(instrument.getChordGenerator()({ duration: { fraction: 4 } }).stringNum).toBe(DEFAULT_STRING_COUNTS.BASS);
    instrument = Instrument.Create({ code: INSTRUMENT_CODES.DRUMS });
    expect(instrument.getChordGenerator()({ duration: { fraction: 4 } }).stringNum).toBe(DEFAULT_STRING_COUNTS.GUITAR);
})