import {Board} from './board';
import {Turn} from "./turn";
import {Dice} from "./dice";

export class Player {
    id: number
    winner: boolean = false

    /**
     * Laat de huidige speler een beurt spelen door te gooien met de dobbelsteen. Daarna moet de speler naar het juiste
     * vakje gezet worden.
     *
     * @return De informatie over deze gooi-beurt
     */
    takeTurn(board: Board) : Turn {
        var dice = new Dice()
        var steps = dice.roll()
        var oldPos = board.playerPosition(this)
        var newPos = board.movePlayer(this, steps)
        return new Turn(steps, oldPos, newPos);
    }

    canPlayTurn(): boolean {
        return !this.winner
    }
}
