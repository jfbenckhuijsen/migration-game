import {Player} from './player';
import {Board} from './board';

export abstract class Square {
    place: number
    player: Player | undefined

    protected constructor(place: number) {
        this.place = place
        this.player = undefined
    }

    playerLands(player: Player, board: Board) {
        this.player = player
        this.doPlayerLands(player, board)
    }

    /**
     * Template method voor de definitie van speciale vakjes.
     * @param player The huidige speler die op het vakje land
     * @param board Het board waar het vakje toe behoort.
     */
    abstract doPlayerLands(player: Player, board: Board): void
}

export class NormalSquare extends Square {

    constructor(place: number) {
        super(place);
    }

    doPlayerLands(player: Player, board: Board): void {
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
    doPlayerLands(player: Player, board: Board) {
        /// TODO: Ymre
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
