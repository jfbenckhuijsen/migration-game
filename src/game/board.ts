import {Finish, NormalSquare, Square} from './square';

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
     * @param steps
     */
    movePlayer(steps: number) {
        // TODO: Ymre
    }
}
