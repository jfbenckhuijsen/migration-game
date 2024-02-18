import {
    BorderPatrolSquare, DiedSquare,
    Finish, GiftedMoneySquare,
    MovePlayerSquare,
    NormalSquare,
    RobberSquare, SkipTurnSquare,
    Square, TaxiSquare, VisaSquare, WetClothesSquare
} from './square';
import {Player} from './player';

export class Board {
    squares: Array<Square>

    constructor() {
        this.squares = new Array<Square>()
        for (let i = 0; i < 62; i++) {
            var square = new NormalSquare(i)
            this.squares.push(square)
        }
        this.squares.push(new Finish(63, "You arrived in Ter Apel!"))

        this.squares[2] = new SkipTurnSquare(2, "You hav to cross a river skip a turn", 1)
        this.squares[7] = new MovePlayerSquare(7, "A friend has a boat you can use, go to 10", 3)
        this.squares[11] = new BorderPatrolSquare(11, "The Turkish border patrol caught you trying to climb over a fence pay a \u20AC 40")
        this.squares[13] = new MovePlayerSquare(13, "You tried to climb a mountain but fell down, go back to 10", -3)
        this.squares[14] = new MovePlayerSquare(14, "You succesfully climbed the mountain but fell and rolled down go to 17", 3)
        this.squares[18] = new GiftedMoneySquare(18, "A kind lady gifted you \u20AC 30")
        this.squares[22] = new VisaSquare(22, "The Romanian customs caught you trying to get into the country, you need a visa to move on (you can roll for money on your spot until you have the money to move on)")
        this.squares[26] = new TaxiSquare(26, "You took a taxi to get to your destination but he went the wrong way go back to 24 and pay \u20AC 20")
        this.squares[29] = new MovePlayerSquare(29, "You sneaked into a truck go to 34", 5)
        this.squares[33] = new SkipTurnSquare(33, "You got hit by a car, skip one turn", 1)
        this.squares[36] = new VisaSquare(36, "You want to get into France but your pasport is not strong enough, you need a visa to move on (you can roll for money on your spot until you have the money to move on)")
        this.squares[39] = new RobberSquare(39, "When walking in paris a man robbed you, you managed to keep half your money but the other half was stolen")
        this.squares[41] = new VisaSquare(41, "The German customs caught you trying to sneak into Germany you need 2 visa's to move on (you can roll for money on your spot until you have the money to move on)")
        this.squares[45] = new SkipTurnSquare(45, "The police caught you trying to pickpocket someone, you go to jail skip 2 turns", 2)
        this.squares[48] = new MovePlayerSquare(48, "A trucker helped you to cross the border go to 51", 3)
        this.squares[53] = new WetClothesSquare(53, "When crossing a river you fell in, now you have to buy new clothes pay \u20AC 40")
        this.squares[59] = new DiedSquare(59, "You ran from the police and you attacked a police officer you got shot, go back to start")
        this.squares[62] = new SkipTurnSquare(62, "The IND knows your in the country illegally hide! skip 3 turns", 3)
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
     * @param path The steps the player already has taken
     */
    movePlayer(player: Player, steps: number, path: Array<number>) {
        var pos: number = this.playerPosition(player)
        if(pos == undefined) {
            pos = 0
        }
        var newPos = pos + steps
        var direction = (steps >= 0) ? 1 : -1

        // PLayer moved beyond the finish line
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

        if (newPos < 0) {
            newPos = 0
        }
        path.push(newPos)

        if (newPos > 0) {
            var square = this.squares[newPos]
            square.occupy(player, this, path)
        }
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

    squareDescriptionForPath(path: Array<number>): Array<string> {
        return path.map(index => this.squares[index])
            .map(square => square.description)
    }
}
