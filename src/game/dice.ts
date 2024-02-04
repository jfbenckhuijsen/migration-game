export class Dice {

    /**
     * returns a random number between 1 and 6
     */
    roll(): number {
        return Math.floor(Math.random() * 6) + 1
    }

    rollDices(times: number) : number {
        var total = 0
        for (let i = 0; i < times; i++) {
            var v = this.roll()
            total = total + v
        }
        return total
    }
}
