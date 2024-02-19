import {Image} from "p5";
import * as p5 from "p5";
import cups from './cups.png'
import {Game} from "../game/game";
import {Player} from "../game/player";

export class WinnerScreen {
    game: Game;

    cups: p5.Element
    first: p5.Element
    second: p5.Element
    third: p5.Element

    elems: Array<p5.Element> = new Array<p5.Element>()

    constructor(game: Game) {
        this.game = game
    }

    setup(sketch: p5) {
        this.cups = sketch.createImg(cups, "")
            .position(160, 30)
        this.first = sketch.createDiv("1111111111111")
            .addClass("first")
            .position(960 / 2 + 120, 458)
        this.second = sketch.createDiv("2222222222222")
            .addClass("second")
            .position(280, 463)
        this.third = sketch.createDiv("33333333333333")
            .addClass("third")
            .position(930, 463)

        this.elems.push(this.cups)
        this.elems.push(this.first)
        this.elems.push(this.second)
        this.elems.push(this.third)

        this.elems.forEach(e => e.addClass("winnerScreen"))
        this.hide()
    }

    show() {
        let winners = this.game.winners()

        this.showWinner(this.first, winners[0])
        this.showWinner(this.second, winners[1])
        this.showWinner(this.third, winners[2])

        this.elems.forEach(e => e.removeClass("hidden"))
    }

    private showWinner(elem: p5.Element, player: Player) {
        elem.elt.innerHTML = `Player ${player.id}`
    }

    hide() {
        this.elems.forEach(e => e.addClass("hidden"))
    }
}