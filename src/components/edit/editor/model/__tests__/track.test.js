import Track from '../track'
import Composition from '../composition'
import { INSTRUMENT_CODES } from '../instrument'

it('Track is created', () => {
    let composition = Composition.Create({ name: 'test composition' });
    expect(Track.Create({
        composition: composition,
        instrument: {
            code: INSTRUMENT_CODES.GUITAR
        }
    })).toBeDefined();
});

it('Track is validated', () => {
    expect(() => Track.Create()).toThrow();
    expect(() => Track.Create({})).toThrow();
    let composition = Composition.Create({ name: 'test composition' });
    expect(() => Track.Create({
        composition: composition
    })).toThrow();
});
