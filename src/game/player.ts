import {Board} from './board';
import {Turn} from "./turn";
import {Dice} from "./dice";

export class Player {

    static INITIAL_MONEY = 30
    static MONEY_PER_STEP = 5

    id: number
    winner: boolean = false
    money: number = Player.INITIAL_MONEY
    skipTurns: number = 0
    doubleMoney: number = 1
    rollDouble: number = 1
    visa: number = 0

    constructor(id: number) {
        this.id = id
    }

    /**
     * Laat de huidige speler een beurt spelen door te gooien met de dobbelsteen. Daarna moet de speler naar het juiste
     * vakje gezet worden.
     *
     * @return De informatie over deze gooi-beurt
     */
    takeTurn(board: Board) : Turn {
        let dice = new Dice()
        let steps = dice.roll()

        // TODO: Multiple dice

        this.money += steps * Player.MONEY_PER_STEP * this.doubleMoney

        steps *= this.rollDouble
        let oldPos = board.playerPosition(this)
        let path = new Array<number>()
        board.movePlayer(this, steps, path)

        // reset bought items
        this.doubleMoney = 1
        this.rollDouble = 1

        return new Turn([steps], oldPos, path)
    }

    canPlayTurn(): boolean {
        if (this.skipTurns > 0) {
            this.skipTurns -= 1
            return false
        }

        return !this.winner
    }

    reset() {
        this.money = Player.INITIAL_MONEY
    }

    hasMoney(): boolean {
        return this.money > 0
    }

    visaCount(): number {
        return this.visa
    }

    doubleSpaces(): boolean {
        return this.rollDouble == 2
    }

    negativeSpaces(): boolean {
        return this.rollDouble == -1
    }

    hasExtraDice(): boolean {
        // TODO: Ymre

        return false

    }

    hasDoubleMoney(): boolean {
        return this.doubleMoney == 2;
    }


}
