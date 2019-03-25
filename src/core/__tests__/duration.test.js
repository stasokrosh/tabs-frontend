import Duration, { DURATION_FRACTIONS, EIGHTS_IN_QUATER } from '../duration'

it('Fraction is created', () => {
    for (let quaterIs of EIGHTS_IN_QUATER)
        for (let fraction of DURATION_FRACTIONS)
            expect(Duration.Create({ fraction: fraction, quaterIs: quaterIs, dot: 1 })).toBeDefined();
});

it('Fraction is validated', () => {
    expect(() => { Duration.Create({}) }).toThrow();
    expect(() => { Duration.Create(3) }).toThrow();
    let duration = Duration.Create({ fraction: 1 });
    expect(() => { duration.fraction = 3 }).toThrow();
    expect(() => { duration.quaterIs = 4 }).toThrow();
});
