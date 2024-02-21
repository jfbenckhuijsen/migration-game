
export class Turn {
    diceValues: Array<number>
    startingPosition: number
    path: Array<number>

    constructor(diceValues: Array<number>, startingPosition: number, path: Array<number>) {
        this.diceValues = diceValues;
        this.startingPosition = startingPosition;
        this.path = path;
    }
}
