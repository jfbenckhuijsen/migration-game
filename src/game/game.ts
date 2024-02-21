import {Player} from './player';
import {Turn} from "./turn";
import {Board} from "./board";

export class Game {
    board: Board
    players: Array<Player> = new Array<Player>()
    winnerList: Array<Player> = new Array<Player>()
    current: Player

    constructor(numberOfPlayers: number) {
        this.board = new Board()

        for (let i = 0; i < numberOfPlayers; i++) {
            let player = new Player(i)
            this.players.push(player)
        }

        let firstPlayer =  Math.floor(Math.random() * numberOfPlayers)
        this.current = this.players[firstPlayer]
    }

    /**
     * Returns the number of players for this game.
     */
    numberOfPlayers(): number {
        return this.players.length
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

        let currentIndex = this.players.indexOf(this.current)
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

    isCurrent(player: Player) {
        return this.current == player
    }

    isWinner(player: Player) {
        return this.winnerList.indexOf(player) != -1
    }

    /**
     * Returns the place the player finished
     * @param player The player
     * @return the place (0-indexed) or -1 if the player is not a winner
     */
    placedAt(player: Player): number {
        return this.winnerList.indexOf(player)
    }

    /**
     * Return the descriptions for the path the user has taken. Includes empty
     * descriptions for normal squares
     * @param path The path
     */
    squareDescriptionForPath(path: Array<number>): Array<string> {
        return this.board.squareDescriptionForPath(path)
    }

    /**
     * Return the players other than the current player
     * @param player The current player
     * @return the list of other players
     */
    otherPlayers(player: Player): Array<Player> {
        return this.players.filter(p => p != player)
    }

}
