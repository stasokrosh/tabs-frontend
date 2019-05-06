import Reprise from '../reprise'

it('Reprise is created', () => {    
    expect(Reprise.Create({})).toBeDefined();
    expect(Reprise.Create({count : 1})).toBeDefined();
})

it('Repirse is validated', () => {
    expect(() => Reprise.Create({count : -1})).toThrow();
    let reprise = Reprise.Create({});
    expect(() => reprise.count = -1).toThrow();
})