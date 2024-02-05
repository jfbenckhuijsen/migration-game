import {Finish, NormalSquare, Square} from './square';
import {Player} from './player';

export class Board {
    squares: Array<Square>

    constructor() {
        this.squares = new Array<Square>()
        for (let i = 0; i < 62; i++) {
            this.squares.push(new NormalSquare(i))
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
     */
    movePlayer(player: Player, steps: number) {
        // TODO: Ymre
    }

    /**
     * Geef de huidige positie van de speler. Als de speler niet op het bord staat, dan geef undefined
     * @param player De speler die je moet vinden.
     */
    playerPosition(player: Player): number | undefined {
        // TODO: Ymre
        return undefined;
    }
}
