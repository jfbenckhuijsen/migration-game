import {Player} from './player';
import {Turn} from "./turn";
import {Board} from "./board";

export interface GameUI {

    draw(): void

}

export class Game {
    private gameUI: GameUI;
    board: Board
    players: Array<Player> = new Array<Player>()
    winnerList: Array<Player> = new Array<Player>()
    current: Player

    constructor(gameUI: GameUI, numberOfPlayers: number) {
        this.gameUI = gameUI;

        this.board = new Board()

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
        if (this.current.winner) {
            this.winnerList.push(this.current)
        }

        var currentIndex = this.players.indexOf(this.current)
        currentIndex = (currentIndex + 1) % this.players.length

        while (!this.players[currentIndex].canPlayTurn()) {
            currentIndex = (currentIndex + 1)  % this.players.length
        }

        this.current = this.players[currentIndex]
    }

    /**
     * Geef true terug als iedereen behalve 1 speler een winnaar is.
     */
    isEnded(): boolean {
        return this.winnerList.length == this.players.length - 1
    }

    /**
     * Geeft de winnaars van het spel in volgorde die ze gewonnen hebben. Indien er nog geen winnaar is, zal dit een
     * lege lijst opleveren.
     */
    winners(): Array<Player> {
        return this.winnerList
    }

}

