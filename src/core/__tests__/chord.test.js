import Chord from '../chord'
import Note from '../note'

it('Chord is created', () => {
    expect(Chord.CreateGuitarChord({ duration: { fraction: 1 } })).toBeDefined();
    expect(Chord.CreateBassChord({ duration: { fraction: 1 } })).toBeDefined();
    let note = { fret: 3 };
    expect(Chord.CreateGuitarChord({
        notes: [{ index: 0, item: note }],
        duration: { fraction: 1 }
    })).toBeDefined();
});

it('Notes set and get', () => {
    let chord = Chord.CreateGuitarChord({ duration: { fraction: 1 } });
    let note = Note.Create({
        fret: 3
    });
    chord.setNote(0, note);
    expect(chord.getNote(0).fret).toBe(3);
    expect(chord.notes[0].index === 0 && chord.notes[0].item.fret === 3).toBe(true);
});

it('Chord is validated', () => {
    expect(() => Chord.Create()).toThrow();
    let chord = Chord.CreateGuitarChord({ duration: { fraction: 1 } });
    expect(() => chord.getNote(7)).toThrow();
    expect(() => chord.setNote(7, {})).toThrow();
})

it('Chords are equal', () => {
    let chord1 = Chord.CreateGuitarChord({ duration: { fraction: 1 } });
    let chord2 = Chord.CreateBassChord({ duration: { fraction: 1 } });
    expect(chord1.equal(chord2)).toBe(false);
    chord2 = Chord.CreateGuitarChord({ duration: { fraction: 1 } });
    expect(chord1.equal(chord2)).toBe(true);
    let note = Note.Create({
        fret: 3
    });
    chord1.setNote(2, note);
    chord2.setNote(2, note);
    expect(chord1.equal(chord2)).toBe(true);
    chord2.getNote(2).fret = 4;
    expect(chord1.equal(chord2)).toBe(false);
})