import Tact from '../tact'
import TactDuration from '../tact-duration'
import Reprise from '../reprise';

it('Tact is created',() => {
    expect(Tact.Create({
        tactDuration : TactDuration.Create({fraction : 4, count : 4}) 
    })).toBeDefined();
    expect(Tact.Create({
        tactDuration : TactDuration.Create({fraction : 4, count : 4}),
        reprise : Reprise.Create({}) 
    })).toBeDefined();
});

it('Tact is validated', () => {
    expect(() => Tact.Create({})).toThrow();
});