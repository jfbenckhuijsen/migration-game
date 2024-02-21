import {Player} from './player';
import {Board} from './board';

export abstract class Square {
    place: number
    player: Player | undefined
    description: string

    protected constructor(place: number, description: string) {
        this.place = place
        this.player = undefined
        this.description = description
    }

    /**
     * @return true als er een speler op dit vakje staat, anders false
     */
    isOccupied() : boolean {
        return this.player != undefined;
    }

    /**
     * Controleer of de speler op dit vakje staat
     * @param thePlayer De speler
     * @return true indien de speler op het vakje staat, anders false
     */
    isOccupiedBy(thePlayer: Player): boolean {
        return this.player == thePlayer
    }

    /**
     * Laad de speler een vakje bezetten.
     * @param player De speler
     * @param board Het board waar het vakje bij hoort
     * @param path The Path the player will take
     */
    occupy(player: Player, board: Board, path: Array<number>) {
        this.player = player
        this.playerLands(player, board, path)

        // Check if the player still has Money
        if (!player.hasMoney()) {
            this.leave()
            player.reset()
            path.push(0)
        }
    }

    /**
     * Haal de speler die op het vakje staat weg van dit vakje.
     * @return true if the player can leave the square, false otherwise
     */
    leave(): boolean {
        this.player = undefined
        return true
    }

    /**
     * Template method voor de definitie van speciale vakjes.
     * @param player The huidige speler die op het vakje land
     * @param board Het board waar het vakje toe behoort.
     * @param path The path the player will take
     */
    abstract playerLands(player: Player, board: Board, path: Array<number>): void
}

export class NormalSquare extends Square {

    constructor(place: number) {
        super(place, "")
    }

    playerLands(_1: Player, _2: Board): void {
    }
}

export class Finish extends Square {

    constructor(place: number, description: string) {
        super(place, description);
    }

    /**
     * De speler die op dit vakje land moet aangemerkt worden als een winnaar.
     *
     * @param player De huidige speler
     * @param board The board
     * @param path The path the player has taken
     */
    playerLands(player: Player, board: Board, path: Array<number>) {
        if (player.visa < 3) {
            board.movePlayer(player, -1, path)
        } else {
            player.winner = true
        }
    }
}

/**
 * A friend has a boat you can use, go to 12
 */
export class MovePlayerSquare extends Square {
    private readonly steps: number;

    constructor(place: number, description: string, steps: number) {
        super(place, description);
        this.steps = steps
    }

    playerLands(player: Player, board: Board, path: Array<number>): void {
        board.movePlayer(player, this.steps, path)
    }

}

/**
 * The Turkish border patrol caught you trying to climb over the fence, you need to pay a fine: €40
 */
export class BorderPatrolSquare extends Square {

    constructor(place: number, description: string) {
        super(place, description)
    }

    playerLands(player: Player, _: Board): void {
        player.money -= 40
    }

}

/**
 * A kind lady from Finland gave you €30
 */
export class GiftedMoneySquare extends Square {

    constructor(place: number, description: string) {
        super(place, description)
    }

    playerLands(player: Player, _: Board): void {
        player.money += 30
    }

}

/**
 * The Bulgarian customs caught you trying to cross the border, you need a visa to move on (you can roll on your spot
 * for money, as soon as you have the money you have to move on)
 *
 * You want to legally cross the Serbian border but your passport is not strong enough, you need a visa to move on
 * (you can roll on your spot for money, as soon as you have the money you have to move on)
 *
 * When crossing the Hungarian border, the border patrol caught you going over the border, you need 2 visa’s to move
 * on (you can roll on your spot for money, as soon as you have the money you have to move on)
 */
export class VisaSquare extends Square {
    requiredVisas: number

    constructor(place: number, description: string, requiredVisas: number) {
        super(place, description)
        this.requiredVisas = requiredVisas
    }

    playerLands(_1: Player, _2: Board, _3: Array<number>): void {
    }

    leave(): boolean {
        if (this.player.visa >= this.requiredVisas) {
            this.player.visa -= this.requiredVisas
            return super.leave()
        } else {
            return false
        }
    }
}

/**
 * You used a taxi to get to your destination but he scammed you and drove you the wrong way, you lose €20 and go back to 24
 */
export class TaxiSquare extends Square {

    constructor(place: number, description: string) {
        super(place, description)
    }

    playerLands(player: Player, board: Board, path: Array<number>): void {
        player.money -= 20

        if (player.hasMoney()) {
            board.movePlayer(player, -2, path)
        }
    }

}

/**
 * You got hit by a car, skip 1 turn
 *
 * The Hungarian police caught you pickpocketing someone, you have to go to prison, skip 2 turns. (you can’t roll for
 * money, you can bribe the cops to let you free, €100)
 *
 * The Austrian IND knows your in their country illegal, you have to hide. Skip 3 turns
 */
export class SkipTurnSquare extends Square {
    turnsSkip: number

    constructor(place: number, description: string, turnSkip: number) {
        super(place, description)
        this.turnsSkip = turnSkip
    }

    playerLands(player: Player, _: Board): void {
        player.skipTurns = this.turnsSkip
    }

}

/**
 * When walking in Belgrado a man robbed you, you managed to keep half your money, the other half is stolen.
 */
export class RobberSquare extends Square {

    constructor(place: number, description: string) {
        super(place, description)
    }

    playerLands(player: Player, _: Board): void {
        player.money /= 2
    }

}

/**
 * When crossing a river you fell in and got wet, you need to buy new clothes, -€40
 */
export class WetClothesSquare extends Square {

    constructor(place: number, description: string) {
        super(place, description)
    }

    playerLands(player: Player, _: Board): void {
        player.money -= 40
    }

}

/**
 * You ran from the German police and even attacked one of them, you got shot. You back to start
 */
export class DiedSquare extends Square {

    constructor(place: number, description: string) {
        super(place, description)
    }

    playerLands(player: Player, _: Board, path: Array<number>): void {
        this.leave()
        player.reset()
        path.push(0)
    }

}
