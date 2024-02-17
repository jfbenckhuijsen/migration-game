import {Player} from './player';
import {Turn} from "./turn";
import {Board} from "./board";

export interface GameUI {

    draw(): void

}

export class Game {
    private gameUI: GameUI;
    board: Board
    players: Array<Player>
    current: Player

    constructor(gameUI: GameUI, numberOfPlayers: number) {
        this.gameUI = gameUI;

        this.board = new Board()
        this.players = new Array<Player>()
        for (let i = 0; i < numberOfPlayers; i++) {
            var player = new Player()
            this.players.push(player)
        }

        this.current = this.players[0]


        // TODO: laat een random speler de eerste speler zijn
    }

    /**
     * Laat de huidige speler een beurt nemen.
     * @return De informatie over de Turn
     */
    takeTurn(): Turn {
        return this.current.takeTurn(this.board)
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

