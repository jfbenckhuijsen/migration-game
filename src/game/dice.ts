export class Dice {

    /**
     * returns a random number between 1 and 6
     */
    roll(): number {
        return Math.floor(Math.random() * 6) + 1
    }

    rollDices(times: number) : Array<number> {
        let totDices = new Array<number>()
        for (let i = 0; i < times; i++) {
            totDices.push(this.roll())
        }
        return totDices
    }
}
