import {Player} from './player';
import {Turn} from "./turn";

export interface GameUI {

    draw(): void

}

export class Game {
    private gameUI: GameUI;

    constructor(gameUI: GameUI, numberOfPlayers: number) {
        this.gameUI = gameUI;

        // TODO: Maak een spel aan met het opgegeven aantal spelers
        // TODO: Maak een nieuw bord aan
        // TODO: laat een random speler de eerste speler zijn
    }

    /**
     * Laat de huidige speler een beurt nemen.
     * @return De informatie over de Turn
     */
    takeTurn(): Turn {
        // TODO: Ymre
        return undefined
    }

    /**
     * Laat de volgende speler aan de beurt zijn.
     *
     * Controleer vooraf of de huidige speler gewonnen heeft. Als dat het geval is, moet hij toegevoegd worden aan de lijst
     * van winnaars. Als de een-na-laatste speler gewonnen heeft, dan is het spel afgelopen. Een speler die al gewonnen heeft,
     * komt niet meer aan de beurt.
     */
    endTurn() {
        // TODO: Ymre
    }

    /**
     * Geef true terug als er een winnaar van het spel is.
     */
    isEnded(): boolean {
        // TODO Ymre
        return false;
    }

    /**
     * Geeft de winnaars van het spel in volgorde die ze gewonnen hebben. Indien er nog geen winnaar is, zal dit een
     * lege lijst opleveren.
     */
    winner(): Array<Player> {
        // TODO Ymre
        return new Array<Player>()
    }

}

