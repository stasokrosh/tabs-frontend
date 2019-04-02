import Composition from "./composition";
import { INSTRUMENT_CODES } from "./instrument";

export function createTestComposition() {
    let composition = Composition.Create({
        name: "Test composition"
    });
    let tactDuration = {
        fraction: 4,
        count: 4
    };
    for (let index = 0; index < 8; index++) {
        composition.addTact({ tactDuration });
    }
    composition.addTrack({
        name : 'Test track 1',
        instrument : {
            code : INSTRUMENT_CODES.GUITAR
        }
    });
    let chord = {
        duration : {
            fraction : 4
        },
        notes : [{
            index : 0,
            item : {
                fret : 3
            }
        }]
    }
    for (let index = 0; index < 8; index++) {
        for (let queue = 0; queue < 4; queue++) {
            composition.getTrack(0).getTact(index).addChord(chord);
        }
    }
    return composition;
}