import {Player} from './player';
import {Board} from './board';

export abstract class Square {
    place: number
    player: Player | undefined

    protected constructor(place: number) {
        this.place = place
        this.player = undefined
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
     */
    occupy(player: Player, board: Board) {
        this.player = player
        this.playerLands(player, board)
    }

    /**
     * Haal de speler die op het vakje staat weg van dit vakje.
     */
    leave() {
        this.player = undefined
    }

    /**
     * Template method voor de definitie van speciale vakjes.
     * @param player The huidige speler die op het vakje land
     * @param board Het board waar het vakje toe behoort.
     */
    abstract playerLands(player: Player, board: Board): void
}

export class NormalSquare extends Square {

    constructor(place: number) {
        super(place);
    }

    playerLands(player: Player, board: Board): void {
    }
}

export class Finish extends Square {

    constructor(place: number) {
        super(place);
    }

    /**
     * De speler die op dit vakje land moet aangemerkt worden als een winnaar.
     *
     * @param player De huidige speler
     * @param board Het speelbord
     */
    playerLands(player: Player, board: Board) {
        player.winner = true
    }
}

//
//
// abstract class Animal {
//
//     abstract makeSound(): string
// }
//
// class Dog extends Animal {
//     name: string
//
//     makeSound(): string {
//         return "Woof"
//     }
// }
//
// class Cat extends Animal {
//
//     makeSound(): string {
//         return 'miauw';
//     }
//
// }
// //
// // var google = new Dog()
// // google.name = "Google"
// // google.makeSound()
