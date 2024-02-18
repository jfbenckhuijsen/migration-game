
export class Turn {
    diceValue: number
    startingPosition: number
    path: Array<number>

    constructor(diceValue: number, startingPosition: number, path: Array<number>) {
        this.diceValue = diceValue;
        this.startingPosition = startingPosition;
        this.path = path;
    }
}
