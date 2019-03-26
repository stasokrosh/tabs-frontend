import Note, { DEFAULT_FRET_COUNTS } from '../note'
import Duration from '../duration';

it('Note is created', () => {
    let duration = Duration.Create({ fraction: 1 });
    expect(Note.Create({
        duration: duration,
        fret: 0
    })).toBeDefined();
    expect(Note.Create({
        duration: duration,
        maxFret: DEFAULT_FRET_COUNTS.GUITAR,
        fret: 3
    })).toBeDefined();
});

it('Note is validated', () => {
    expect(() => { Note.Create() }).toThrow();
    let duration = Duration.Create({ fraction: 1 });
    expect(() => Note.Create({
        duration: duration,
        fret: -1
    })).toThrow();
    expect(() => Note.Create({
        duration: duration,
        maxFret: DEFAULT_FRET_COUNTS.GUITAR,
        fret: DEFAULT_FRET_COUNTS.GUITAR + 1
    })).toThrow();
});

it('Notes are equal', () => {
    let duration = new Duration({ fraction: 1 });
    let note1 = Note.Create({
        duration: duration,
        fret: 0
    });
    let note2 = Note.Create({
        duration: duration,
        fret: 0
    });
    expect(note1.equal(note2)).toBe(true);
    note1.fret = 1;
    expect(note1.equal(note2)).toBe(false);
});