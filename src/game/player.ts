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

    /**
     * Laat de huidige speler een beurt spelen door te gooien met de dobbelsteen. Daarna moet de speler naar het juiste
     * vakje gezet worden.
     *
     * @return De informatie over deze gooi-beurt
     */
    takeTurn(board: Board) : Turn {
        var dice = new Dice()
        var steps = dice.roll()
        this.money += steps * Player.MONEY_PER_STEP

        var oldPos = board.playerPosition(this)
        var path = new Array<number>()
        board.movePlayer(this, steps, path)
        return new Turn(steps, oldPos, path)
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
}
