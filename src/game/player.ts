import {Board} from './board';
import {Turn} from "./turn";
import {Dice} from "./dice";

export class Player {

    static INITIAL_MONEY = 30
    static MONEY_PER_STEP = 5

    id: number
    winner: boolean = false
    money: number = Player.INITIAL_MONEY

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
        var newPos = board.movePlayer(this, steps)
        return new Turn(steps, oldPos, newPos);
    }

    canPlayTurn(): boolean {
        return !this.winner
    }
}
