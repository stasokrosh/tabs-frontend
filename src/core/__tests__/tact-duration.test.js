import TactDuration from '../tact-duration'

it('Tact duration is created', () => {
    expect(TactDuration.Create({fraction : 4, count : 4})).toBeDefined();
});

it('Tact duration is validated', () => {
    expect(() => TactDuration.Create({fraction : 4, count : 5})).toThrow();
    expect(() => TactDuration.Create({fraction : 3, count : 2})).toThrow();
    let tactDuration = TactDuration.Create({fraction : 4, count : 4});
    expect(() => tactDuration.count = 5).toThrow();
    expect(() => tactDuration.fraction = 5).toThrow();
})