import Composition from "./composition";
import { INSTRUMENT_CODES } from "./instrument";

const TACT_AMOUNT = 16;

export function createTestComposition() {
    let composition = Composition.Create({
        name: "Test composition"
    });
    let tactDuration = {
        fraction: 4,
        count: 4
    };
    for (let index = 0; index < TACT_AMOUNT; index++) {
        if (index === 4) 
            tactDuration.count = 3;
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
        isPause : true
    }
    for (let index = 0; index < TACT_AMOUNT; index++) {
        for (let queue = 0; queue < 4; queue++) {
            composition.getTrack(0).getTact(index).addChord(chord);
        }
    }
    return composition;
}