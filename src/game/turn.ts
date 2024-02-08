
export class Turn {
    diceValue: number
    startingPosition: number
    landingPosition: number

    constructor(diceValue: number, startingPosition: number, landingPosition: number) {
        this.diceValue = diceValue;
        this.startingPosition = startingPosition;
        this.landingPosition = landingPosition;
    }
}
