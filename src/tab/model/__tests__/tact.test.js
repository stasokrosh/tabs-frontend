import Tact from '../tact'
import TactDuration from '../tact-duration'

it('Tact is created',() => {
    expect(Tact.Create({
        tactDuration : TactDuration.Create({fraction : 4, count : 4}) 
    })).toBeDefined();
    expect(Tact.Create({
        tactDuration : TactDuration.Create({fraction : 4, count : 4}),
        reprise : 2
    })).toBeDefined();
});

it('Tact is validated', () => {
    expect(() => Tact.Create({})).toThrow();
});