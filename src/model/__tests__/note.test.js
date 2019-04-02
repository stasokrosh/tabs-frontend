import Note, { DEFAULT_FRET_COUNTS } from '../note'

it('Note is created', () => {
    expect(Note.Create({
        fret: 0
    })).toBeDefined();
    expect(Note.Create({
        maxFret: DEFAULT_FRET_COUNTS.GUITAR,
        fret: 3
    })).toBeDefined();
});

it('Note is validated', () => {
    expect(() => { Note.Create() }).toThrow();
    expect(() => Note.Create({
        fret: -2
    })).toThrow();
    expect(() => Note.Create({
        maxFret: DEFAULT_FRET_COUNTS.GUITAR,
        fret: DEFAULT_FRET_COUNTS.GUITAR + 1
    })).toThrow();
});

it('Notes are equal', () => {
    let note1 = Note.Create({
        fret: 0
    });
    let note2 = Note.Create({
        fret: 0
    });
    expect(note1.equal(note2)).toBe(true);
    note1.fret = 1;
    expect(note1.equal(note2)).toBe(false);
});