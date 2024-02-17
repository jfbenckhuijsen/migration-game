import {Finish, NormalSquare, Square} from './square';
import {Player} from './player';

export class Board {
    squares: Array<Square>

    constructor() {
        this.squares = new Array<Square>()
        for (let i = 0; i < 62; i++) {
            var square = new NormalSquare(i)
            this.squares.push(square)
        }
        this.squares.push(new Finish(63))
    }

    /**
     * Verplaats een speler van zijn huidige vakje een aantal stappen voorwaarts.
     *
     * Zoek de speler in de lijst van vakjes naar zijn huidige positie.
     *
     * Indien de speler zich nog niet op een van de vakjes bevind, dan is het zijn eerste beurt en
     * start hij vanaf 0.
     *
     * Verplaats de speler naar zijn doelvakje.
     *   * Weghalen van zijn huidige vakje
     *   * Neerzetten op zijn nieuwe vakje.
     *
     * Als op de doellocatie al een speler bevindt, dan moet hij naar het volgende vakje.
     *
     * Als de speler meer gooit dan het aantal vakjes dat er is, dan moet je terugtellen.
     *
     * @param player The player to move
     * @param steps The number of steps to move
     * @return De nieuwe positie van de speler
     */
    movePlayer(player: Player, steps: number): number {
        var pos: number = this.playerPosition(player)
        if(pos == undefined) {
            pos = 0
        }
        var newPos = pos + steps

        // PLayer moved beyond the finish line
        var direction = 1

        if (newPos >= this.squares.length) {
            var stepsBack = newPos - this.squares.length
            newPos = this.squares.length - stepsBack
            direction = -1
        }

        // Player lands on another player
        while (this.squares[newPos].isOccupied()) {
            newPos = newPos + direction
        }

        // Move the plauer
        var oldSquare = this.squares [pos]
        oldSquare.leave()
        var square = this.squares[newPos]
        square.occupy(player, this)

        return newPos;
    }

    /**
     * Geef de huidige positie van de speler. Als de speler niet op het bord staat, dan geef undefined
     * @param player De speler die je moet vinden.
     */
    playerPosition(player: Player): number | undefined {
        for (let i = 0; i < this.squares.length; i++) {
            var square = this.squares[i]
            if (square.isOccupiedBy(player)) {
                return square.place
            }
        }
        return undefined;
    }
}
